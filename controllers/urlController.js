const {nanoid} = require('nanoid');
const Url = require('../models/url');
const passport = require('../config/passport-local-strategy');

const isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.status(401).json({ error: 'Authentication required' });
  };


async function generateShortUrl(req, res){

    try
    {
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
    catch (error) {
        console.error('Error in generateShortUrl:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

}

async function redirectUrl(req,res){

    try
    {
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
    } catch (error) {
        console.error('Error in redirectUrl:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

}

module.exports = {
    generateShortUrl: [isAuthenticated, generateShortUrl], 
    redirectUrl,
}