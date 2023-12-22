const {nanoid} = require('nanoid');
const Url = require('../models/url');


async function generateShortUrl(req, res){

    const body = req.body;
    console.log("Original url:", body);

    if(!body.url)
    {
        return res.status(400).json(
            {
                error:'url is required'
            }
        )
    }

    const shortID = nanoid(8);
    await Url.create(
        {
        shortUrl: shortID,
        originalUrl:body.url,
        visitedHistory:[],
        }
    );

    return res.json({id:shortID});
}

async function redirectUrl(req,res){

    const shortUrl = req.params.shortUrl;
    const entry = await Url.findOneAndUpdate
    (
        {
        shortUrl
        },
        { $push:
            {
                visitedHistory:
                {
                    timestamp: Date.now()

                }
            }
        }
    )
console.log("Entry OriginalURL:",entry.originalUrl);
    res.redirect(entry.originalUrl);

}

module.exports = {
    generateShortUrl,
    redirectUrl
}