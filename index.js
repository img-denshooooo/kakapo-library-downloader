// v 1.0.0

// imports
const request = require('request');
const io = require('socket.io-client');
const fs = require('fs');
const util = require('./util.js');
const {createObjectCsvWriter} = require('csv-writer');

// const
const TIMEOUT = 10000;

const connect = function connect(channel, password, user) {
    let SOCKET;
    const CHANNEL = {name: channel};

    return new Promise((resolve, reject) => {
        request.get({
            uri: `https://cytube.xyz/socketconfig/${channel}.json`
        }, (error, resp, body) => {
            const servers = JSON.parse(body).servers;
            const socketServer = servers[0].url;
            SOCKET = io(socketServer, { reconnection: true });

            SOCKET.on('connect', () => {
                SOCKET.emit('joinChannel', {
                    name: channel
                });
            });

            SOCKET.on('joinChannel', data => {
                console.log(data);
            });

            const randomPlay = new Promise((resolve, reject) => {
                let timer;
                SOCKET.on('setRandomPlay', mode => {
                    CHANNEL.playmode = mode;
                    clearTimeout(timer);
                    resolve(true);
                });
                timer = setTimeout(() => {
                    reject(false);
                }, TIMEOUT);
            });

            const playlistLocked = new Promise((resolve, reject) => {
                let timer;
                SOCKET.on('setPlaylistLocked', mode => {
                    CHANNEL.playlistLocked = mode;
                    clearTimeout(timer);
                    resolve(true);
                });
                timer = setTimeout(() => {
                    reject(false);
                }, TIMEOUT);
            });

            SOCKET.on('error', msg => {
                console.log(msg);
                SOCKET.close();
            });

            SOCKET.on('errorMsg', data => {
                console.log(data.msg);
            });

            Promise.all([randomPlay, playlistLocked])
                .then(() => {
                    console.log("connect success");
                    console.log(CHANNEL);
                    resolve({
                        SOCKET,
                        CHANNEL,
                        success: true
                    });
                })
                .catch(() => {
                    console.log("connect fail");
                    reject({
                        success: false
                    });
                });
        });
    });
}

const write = function write(records, fileName) {
    const header = function(id, title) {
        return {id, title};
    };

    const time = function(time) {
        return Math.floor(time / 60) + ':' + (time % 60);
    };

    // UTF-8のCSVはEXCELで開くと文字化けするんでBOM足す
    fs.writeFile(fileName, '\uFEFF', function (err) {
        if (err) {
            throw err;
        }
    });

    cw = createObjectCsvWriter({
        path: fileName,
        header: [
            header('name', '名前'),
            header('iine', 'いいね'),
            header('time', '動画の長さ'),
            header('type', '場所'),
            header('url', 'URL')
        ],
        encoding: 'utf8',
        append: true
    });

    records = records.map(it => {
        return {
            name: it.title.replace(/\"/g, '”').replace(/\,/g, '，'),
            iine: it.meta.votecnt,
            time: time(it.seconds),
            type: util.getType(it),
            url: util.formatURL(it)
        };
    });

    // BOM足す関係で追記モードでCSVWriterを使うんだけど
    // そうするとヘッダーが記述されないので無理矢理足す

    records.unshift({
        name: '名前',
        iine: 'いいね',
        time: '動画の長さ',
        type: '場所',
        url: 'URL'
    });

    return cw.writeRecords(records);
};

const main = async function main () {
    const { SOCKET, CHANNEL, success } = await connect(process.argv[2])
    if (!success) {
        throw new Error("接続エラー");
    }

    SOCKET.once("searchResults", data => {
        write(data.results, `${CHANNEL.name}.csv`)
            .then(() => {
                console.log(`出力完了:${data.results.length}件`);
                SOCKET.close();
            })
            .catch(e => {
                console.log("異常終了");
                console.log(e);
                SOCKET.close();
            });
    });

    SOCKET.emit("searchMedia", {
        source: "library",
        query: ""
    });

};

main();