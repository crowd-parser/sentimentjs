# sentimentjs

> A sentiment analysis library for tweet objects and strings

<img src="http://i288.photobucket.com/albums/ll175/michaelcheng429/example-screenshot_zps7ofknums.png">

This sentiment library is used in our Crowd Parser app, which analyzes Twitter sentiment. Check it out here: 

[Crowd Parser](https://github.com/crowd-parser/crowd-parser)

Our goal with `sentimentjs` is to improve upon other sentiment libraries by including "layers" that check for factors that other sentiment libraries might ignore or miss.

For example, our "emoticons layer" specifically looks for emoticons in a string or tweet and gauges sentiment based upon its findings.

In the future, we hope to add more "layers," such as a "negation layer" and perhaps a "movie layer" that catches normal words that are actually movies.

Our base word lists come from renowned researchers Minqing Hu and Bing Liu, who authored this paper

_Minqing Hu and Bing Liu. "Mining and Summarizing Customer Reviews."_
_Proceedings of the ACM SIGKDD International Conference on Knowledge_ 
_Discovery and Data Mining (KDD-2004), Aug 22-25, 2004, Seattle, Washington, USA_

## Installation

`npm install sentimentjs`

## Usage

### Analyze an array of strings

```
var sentiment = require('sentimentjs');

var arrayOfStrings = ['I love deep dish pizza :)', 'I hate brussel sprouts >:('];

var sentimentStringsAnalysis = sentiment.stringsArray(arrayOfStrings);

console.log(sentimentStringsAnalysis);
```

Running the above will return an object that has this format:

```
{
  stringsWithAnalyses: [
  {
    text: 'I love deep dish pizza :)',

    baseLayerResults: {
      positiveWords: ['love'],
      negativeWords: [],
      score: 1
    },

    emoticonLayerResults: {
      positiveWords: [':)'],
      negativeWords: [],
      score: 1
    },

    overallResults: {
      score: 2
    }
  },
  {
    text: 'I hate brussel sprouts >:(',

    baseLayerResults: {
      positiveWords: [],
      negativeWords: ['hate'],
      score: -1
    },

    emoticonLayerResults: {
      positiveWords: [],
      negativeWords: ['>:('],
      score: -1
    },

    overallResults: {
      score: -2
    }
  }
  ]
}
```

### Analyze an array of tweet objects

#### Twitter API Credentials

To analyze tweet objects, you will need to have Twitter API credentials (keys, token, and secret). The README for our Crowd Parser app contains instructions for setting this up.

[Crowd Parser](https://github.com/crowd-parser/crowd-parser)

To set up the Twitter API with a Node server, this is how we do it:

```
var Twit = require('twit');

var T = new Twit({
  consumer_key: 'ENTER YOURS HERE', 
  consumer_secret: 'ENTER YOURS HERE', 
  access_token: 'ENTER YOURS HERE', 
  access_token_secret: 'ENTER YOURS HERE'
});
```

#### Using sentimentjs with tweets


```
var sentiment = require('sentimentjs');

T.get('search/tweets', {q: 'football', count: 50, result_type: 'mixed'}, function(err, data) {
  var sentimentTweetsAnalysis = sentiment.tweetsArray(data);

  console.log(sentimentTweetsAnalysis);
});
```

Running the above will return an object that has this format:

```
{
  tweetsWithAnalyses: [
  {
    created_at: ** DATE CREATED ** ,
    id: ** TWEET ID **,
    text: ** TWEET TEXT **,
    username: ** USERNAME **,
    followers_count: ** NUMBER OF FOLLOWERS **,

    baseLayerResults: {
      positiveWords: [ ** POSITIVE WORDS ** ],
      negativeWords: [ ** NEGATIVE WORDS ** ],
      score: 1
    },

    emoticonLayerResults: {
      positiveWords: [ ** POSITIVE EMOTOCONS ** ],
      negativeWords: [ ** NEGATIVE WORDS ** ],
      score: -2
    },

    overallResults: {
      score: -1
    }
  },
  {
    ** SAME AS ABOVE **
  }
  ]
}
```

## Using the Example

First, navigate to the `example` directory.

```
cd example
```

Next, install dependencies:

```
npm install -g bower
npm install
bower install
```

Next, start the server:

```
node server
```

Finally, open `http://localhost:3000` in your browser.

To test, edit the array of strings in `server.js`. You can also try to use the `tweetsArray` method and enter an array of tweets.

```
var results = allLayersAnalysis.stringsArray(['I love dogs. They are wonderful! 😍 😍', 'I hate brussel sprouts. They are terrible. 😾', 'This is great! But also bad.']);
```

Change the above array for testing. Again, the sample output can be displayed like this:

<img src="http://i288.photobucket.com/albums/ll175/michaelcheng429/example-screenshot_zps7ofknums.png">

There is a function in `index.html` to highlight the positive and negative words in the text.

## Contributing

We welcome you to join us in creating a better sentiment library! Our library is still in an infant stage, so contributions would be greatly appreciated!