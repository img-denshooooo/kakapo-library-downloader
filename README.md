# kakapo-library-downloader
kakapo-library-downloaderは生まれたばかりのcytubeのチャンネルのLibraryを落としてCSVにするやつです。  
BOT作るためにcytubeのソース覗いてたらなんとなく把握できた。そして在宅勤務で暇だし作れそうなので作りました。ついでに上げました。  
BOTの1機能として実装しようかとも思ったけどとりあえず別に。

# 出来る事
cytubeのチャンネルのLibraryを全件取得してCSVにします。それだけ。  
鍵付きチャンネルは未対応。要望あれば対応します。

# 使い方

## 0. 準備
必須なのはNodeJSです。なければ公式から安定版をゲットナウ。  
ソースを落とすにはgitクライアントがあると手っ取り早いけどなければ上のClone→Download ZIPでも良いよ。  
[BOTの導入の方](https://github.com/img-denshooooo/kakapo-admin-bot-test#%E5%B0%8E%E5%85%A5%E8%A9%B3%E7%B4%B0%E7%89%88)にも書いてあるから参考にしてね。

## 1. セットアップ
ルートディレクトリ（`package.json`のあるフォルダ）で、  
```
npm install
```
を実行。  
正常に終了すれば`node_modules`というフォルダが出来ます。

## 2. 起動
ルートディレクトリ（`package.json`のあるフォルダ）で、  
```
node index.js {チャンネル名}
```
を実行。`{チャンネル名}`は対象のチャンネルに置き換えてね。  
同フォルダにcsvファイルが出来ます。  
Excelで開けるようにBOM付UTF-8です。

## 3.ごめん
動かなかったらごめんね。  
スレで報告して欲しい。
