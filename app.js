const express = require('express');
const Parser = require('rss-parser');
const { Observable } = require('rxjs');
const { response } = require('express');
const http = require('http');
const app = express();

app.get('/api/feeds', (req, res) => {

    const rssParser = new Parser();
    var allFeeds = [];
    
    rssParser.parseURL('https://www.thesundaily.my/rss/sport', (err, feeds) => {
        //console.log(feeds);
        if(err){
            res.status(501).json({ message : err.stack });
        }
        else{
            allFeeds = [...allFeeds, feeds]
            //res.status(200).json({ message : 'Success', data : feeds });
            rssParser.parseURL('https://www.eyefootball.com/football_news.xml', (err, feeds2) => {
                if(!err){
                    allFeeds = [...allFeeds, feeds2];
                    //console.log(feeds2);
                    res.status(200).json({ message : 'Success', data : allFeeds });
                }
            });
            

        }
    });
  
});

app.listen(3000, () => {
    console.log('Server connected');
});


