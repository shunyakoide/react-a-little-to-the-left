# React a Little to the Left

[English](README.md) | 日本語

[A Little To The Left](https://store.steampowered.com/app/1629520/A_Little_to_the_Left) を遊んで、自分でも作ってみたくなったので再現しました。

心が落ち着く、とても良いゲームです。ぜひ本家も遊んでみてください。

**[デモで遊ぶ](https://shunyakoide.github.io/react-a-little-to-the-left/)**

<img width="1687" alt="スクリーンショット" src="https://github.com/shunyagithub/react-a-little-to-the-left/assets/56504519/1cd0d28b-25ac-4cd6-ba9f-70156c019ab9">

## 遊び方

棚に7冊の本がばらばらの順番で並んでいます。本を左右にドラッグして並べ替えます。

きれいに整う並べ方は2通りあり、見つけるたびに星が1つもらえます。上のボタンを押すと本が元の並びに戻るので、もう1つの並べ方を探せます。

本を置いたときと、正しく並んだときに音が鳴ります。

## 使っている技術

React、TypeScript、Vite で作っています。ドラッグの動きには [react-spring](https://www.react-spring.dev/) と [use-gesture](https://use-gesture.netlify.app/)、状態の管理には [zustand](https://github.com/pmndrs/zustand)、スタイルには Tailwind CSS を使っています。

## 手元で動かす

```bash
pnpm install
pnpm run dev
```

## 参考

[A Little To The Left](https://store.steampowered.com/app/1629520/A_Little_to_the_Left)

[use-gesture](https://use-gesture.netlify.app/)

[use-sound](https://github.com/joshwcomeau/use-sound)

効果音は [Pixabay](https://pixabay.com) のものです。
