var request = require('request');

module.exports = function(jarvis, module) {

	module.addAction(module.createCommand({
		name: 'Tell me a joke',
		description: 'Use the joke sub-reddit to tell a random joke',
		example: "tell me a joke",
		match: new RegExp('tell me a joke(.*)', 'i'),
		func: function(message) {
			request('http://www.reddit.com/r/jokes.json', function (error, response, body) {
				if (!error && response.statusCode == 200) {
					var data = JSON.parse(body);
					var jokes = data.data.children;
					var joke = jokes[Math.floor(Math.random() * jokes.length)].data;
					jarvis.reply(message, joke.title);
					setTimeout(function() {
						jarvis.reply(message, joke.selftext);
					}, 5000);
				}
				else {
					jarvis.reply(message, "No, I'm not in a joking moood right now.");
				}
			});
		}
	}));

};
