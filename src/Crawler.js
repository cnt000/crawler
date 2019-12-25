const Crawler = async (delayMs, callback) => {
  const intervalId = setInterval(async () => {
    try {
      await callback();
    } catch (e) {
      clearInterval(intervalId);
    }
  }, delayMs);
};

module.exports = Crawler;
