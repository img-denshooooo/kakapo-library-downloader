function formatURL(data) {
    switch (data.type) {
        case "yt":
            return "https://youtube.com/watch?v=" + data.id;
        case "sm":
            return "http://www.nicovideo.jp/watch/" + data.id;
        case "vi":
            return "https://vimeo.com/" + data.id;
        case "dm":
            return "https://dailymotion.com/video/" + data.id;
        case "sc":
            return data.id;
        case "li":
            return "https://livestream.com/" + data.id;
        case "tv":
            return "https://twitch.tv/videos/" + data.id.replace(/^v/u, '');
        case "tw":
            return "https://twitch.tv/" + data.id;
        case "rt":
            return data.id;
        case "im":
            return "https://imgur.com/a/" + data.id;
        case "us":
            return "https://ustream.tv/channel/" + data.id;
        case "gd":
            return "https://docs.google.com/file/d/" + data.id;
        case "fi":
            return data.id;
        case "hb":
            return "https://www.smashcast.tv/" + data.id;
        case "up":
            return "#";
        case "rw":
            return data.id;
        case "mf":
            return data.id;
        case "hl":
            return data.id;
        case "sb":
            return "https://streamable.com/" + data.id;
        case "tc":
            return "https://clips.twitch.tv/" + data.id;
        case "cm":
            return data.id;
        case "mx":
            return "https://mixer.com/" + data.meta.mixer.channelToken;
        default:
            return "#";
    }
}

function getType(data) {
    switch (data.type) {
        case "yt":
            return "ようつべ";
        case "sm":
            return "デスマン";
        case "vi":
            return "びめお";
        case "dm":
            return "dailymotion";
        case "sc":
            return "SoundCloud";
        case "li":
            return "LiveStream";
        case "tv":
            return "ついっちビデオ";
        case "tw":
            return "ついっち";
        case "rt":
            return "rtmp?";
        case "im":
            return "imgur";
        case "us":
            return "UStream";
        case "gd":
            return "googleDoc";
        case "fi":
            return "fi?";
        case "hb":
            return "smashcast";
        case "up":
            return "UP";
        case "rw":
            return "rw?";
        case "mf":
            return "mf?";
        case "hl":
            return "hl?";
        case "sb":
            return "Streamable";
        case "tc":
            return "ついっちクリップ";
        case "cm":
            return "cm?";
        case "mx":
            return "mixer";
        default:
            return "#";
    }
}

module.exports = {
    formatURL,
    getType
};