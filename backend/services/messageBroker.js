import amqp from 'amqplib/callback_api.js';

let channel = null;
const channelReady = new Promise((resolve, reject) => {
    amqp.connect('amqp://localhost', function(error0, connection) {
        if (error0) {
            console.error('Failed to connect:', error0);
            reject(error0);
            return;
        }
        connection.createChannel(function(error1, ch) {
            if (error1) {
                console.error('Failed to create channel:', error1);
                reject(error1);
                return;
            }
            channel = ch;
            resolve();
        });
    });
});

export function sendToQueue(queue, message) {
    channel.sendToQueue(queue, Buffer.from(message));
}

export async function consumeFromQueue(queue, callback) {
    await channelReady;
    channel.consume(queue, function(msg) {
        callback(msg.content.toString());
        channel.ack(msg);
    });
}