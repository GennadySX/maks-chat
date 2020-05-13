import './LoadEnv'; //Don't change position /// GennadySX
import app from '@server';
import logger from '@globals/Logger';

// Start the server
const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
    logger.info('Express server port => : ' + port);
});
