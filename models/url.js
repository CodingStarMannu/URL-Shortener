const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema(
    {
        originalUrl:
        {
            type: String,
            required: true
        },
        shortUrl:
        {
            type: String,
            unique: true,
            required: true
        },
        visitedHistory:
        [
            {
                timestamp: 
                {
                    type:Number
                }
            }
        ]
    },
    {timestamps: true}

);

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;
