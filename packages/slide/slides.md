---
theme: ./theme
aspectRatio: 4/3
title: FlashFill
titleTemplate: '%s'
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
layout: intro
class: text-center
---

<h1 class="!text-4xl">Automating string processing</h1>
<h1 class="!text-4xl">in spreadsheets</h1>
<h1 class="!text-4xl">using input-output examples</h1>

<h2 class="pt-20 text-gray-500 !font-normal">Junliang Yan</h2>

<Status></Status>

---
class: text-center
---

# Spreadsheets

<img class="inline-block mt-8" src="/spreadsheets.png" alt="spreadsheets" style="zoom: 80%;">

---
clicks: 1
---

# Collect cities of residence

<div class="w-full">
  <flashfill class="mt-8" edit :data="[
    { input: ['A', 'Jiangsu, nanjing, nju'] },
    { input: ['B', 'Hubei, wuhan, hust'] },
    { input: ['C', 'Shandong, jinan, sdu'] },
    { input: ['D', 'Hunan, changsha, csu'] }
  ]" :input-label="['Name', 'Adress']" output-label="City"
  :input-width="[120, 420]" :output-width="160" />
</div>

<h2 class="mt-8">
  <mdi-close class="text-red-500" v-click="1" />
  <span class="underline">Copy-Paste one by one?</span>
</h2>

<h2 v-click="1">
  <mdi-check class="text-green-500" />
  <span class="underline">Flashfill using input-output example!</span>
</h2>

---
clicks: 2
---

# Flashfill using input-output examples

<h3 class="mt-8"></h3>

<v-click>
  <p class="text-xl"><carbon-dot-mark /> String Manipulation Language</p>
</v-click>

<v-click>
  <p class="mt-8 text-xl"><carbon-dot-mark /> <strong>Synthesize</strong> a program with <strong>input-output examples</strong></p>
</v-click>

<div class="flex justify-center items-center mt-12">
  <div v-click="2">
    <flashfill class="text-sm" hide-run output-width="200" :data="[
      { input: ['A', 'Jiangsu, nanjing, nju'], output: 'nanjing' },
    ]" :input-label="['1', 'Input(2)']" :input-width="[30, 120]" :output-width="60" />
    <p class="text-center">
      <span>Input-output examples</span>
    </p>
  </div>
  <div class="ml-2 mr-2 text-center" v-click="2">
    <div>Synthesize</div>
    <div><mdi-arrow-right-bold /></div>
  </div>
  <div v-click="1">
    <pre class="slidev-code border !text-lg"><code>SubStr2(
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
layout: center
class: text-center
---

# Constructing Output Strings Language

---

# Trace

Output string is a <span class="font-bold underline">concatenation</span> of the <span class="font-bold underline">substrings of inputs</span> or a <span class="font-bold underline">constant string</span>.

$$
\text{Trace Expr } e := \text{Concatenation}(f_1, f_2, \dots, f_n) 
$$

<!--
Input: A    ...., nanjing, ....

Output: A + lives at + nanjing
Substr + ConstStr + SubStr
-->

---

# SubString

---

# Regular Expressions

---

# Atom

$$
\begin{array}{rcl}
\text{Trace Expr  } ~ e & := & \text{Concatenation}(f_1, f_2, \dots, f_n) \\
\text{Atom Expr  } ~ f & := & \text{SubStr}(v_i, p_1, p_2) \\
& | & \text{ConstStr}(s) \\
% & | & \text{Loop}(\lambda w : e)
\end{array}
$$

---

# Alogrithm

---
layout: center
class: text-center
---

# END

<div class="h-8"></div>

# Q & A
