export const makeScreenshot = async page => {
  const screenshot = await page.screenshot({});
  console.log('screenshot taken', screenshot);
  const screenshotBase64 = await screenshot.toString('base64');
  return screenshotBase64;
};
