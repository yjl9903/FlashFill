---
# try also 'default' to start simple
theme: apple-basic
# title of your slide, will auto infer from the first header if not specified
title: FlashFill
# titleTemplate for the webpage, `%s` will be replaced by the page's title
titleTemplate: '%s'
# https://sli.dev/custom/highlighters.html
highlighter: shiki
# show line numbers in code blocks
lineNumbers: true
# persist drawings in exports and build
drawings:
  persist: false

layout: intro
class: 'text-center'
---

<h1 class="!text-4xl">Automating string processing in spreadsheets</h1>
<h1 class="!text-4xl">using input-output examples</h1>

<h2 class="pt-20 text-gray-500">Junliang Yan</h2>

<Status></Status>

<!--  -->

---
class: text-center
---

# Spreadsheets

<img class="inline-block mt-8" src="/spreadsheets.png" alt="spreadsheets" style="zoom: 60%;">

---

# Collect cities of residence

<flashfill class="mt-12" edit :data="[
  { input: ['A', 'Jiangsu, nanjing, nju'] },
  { input: ['B', 'Hubei, wuhan, hust'] },
  { input: ['C', 'Shandong, jinan, sdu'] },
  { input: ['D', 'Hunan, changsha, csu'] }
]" :input-label="['Name', 'Adress']" output-label="City" />

<h2>
  <mdi-close class="text-red-500" v-click="1" />
  <span class="underline">Copy-Paste one by one?</span>
</h2>

<h2 v-click="1">
  <mdi-check class="text-green-500" />
  <span class="underline">Flashfill using input-output example!</span>
</h2>

---

# Flashfill using input-output examples

<h3 class="mt-12"></h3>

<v-click>
  <p><carbon-dot-mark /> String Manipulation Language</p>
</v-click>

<v-click>
  <p class="mt-8"><carbon-dot-mark /> Algorithm to <strong>synthesize</strong> a program with <strong>input-output examples</strong></p>
</v-click>

<div class="flex justify-center items-center font-2xl">
  <div v-click="2">
    <flashfill class="text-sm" hide-run output-width="200" :data="[
      { input: ['A', 'Jiangsu, nanjing, nju'], output: 'nanjing' },
    ]" />
    <p class="text-center">
      <span>Input-output examples</span>
    </p>
  </div>
  <div class="mx-8 text-center" v-click="2">
    <div>Synthesize</div>
    <div><mdi-arrow-right-bold /></div>
  </div>
  <div v-click="1">
    <pre class="slidev-code border"><code>SubStr2(
  Input(2),
  TokenSeq(AlphaToken),
  2
)</code></pre>
    <p class="text-center">
      <span>Program</span>
    </p>
  </div>
</div>

---

# String Manipulation Language

---

# Alogrithm

---
layout: center
class: text-center
---

# END

<div class="h-8"></div>

# Q & A
