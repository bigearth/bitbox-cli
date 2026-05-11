let fs = require('fs');
let assert = require('assert');

describe('#CLI', () => {
  describe('#scaffold options', () => {
    let cli = fs.readFileSync('./index.js', 'utf8');

    it('should document android as a scaffold option', () => {
      assert.equal(cli.includes('android'), true);
    });

    it('should map android scaffold to the Android scaffold repository', () => {
      assert.equal(cli.includes("scaffold === 'android'"), true);
      assert.equal(cli.includes('https://github.com/NoeFabris/bitbox-scaffold-android.git'), true);
    });
  });
});

