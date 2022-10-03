import CronJob from 'node-cron';
import { getPrice } from '../index.js';
import { uploadScreenshots } from '../mongoDB/mongodb2.js';
const initScheduledJobs = () => {
  const scheduledJobFunction = CronJob.schedule('*/1 * * * *', () => {
    // getPrice();
    uploadScreenshots({ image: 'some image but automated' });
    // console.log("I'm executed on a schedule!");
  });

  scheduledJobFunction.start();
};

export default initScheduledJobs;
