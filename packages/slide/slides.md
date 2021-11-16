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

Trace Expr is a <span class="font-bold underline">concatenation</span> of the <span class="font-bold underline">substrings of inputs</span> or a <span class="font-bold underline">constant string</span>.

<div v-click class="w-full text-center">
  <img class="inline-block" src="/trace.png" alt="spreadsheets" style="zoom: 70%;">
  <p class="font-mono mt-8">
    <span>Output: 「A lives at nanjing」</span>
  </p>
</div>

<!-- 
$$
\text{Trace Expr } e := \text{Concatenation}(f_1, f_2, \dots, f_n) 
$$ -->

---
clicks: 5
---

# SubString

<div class="font-mono text-center">
  <span>SubStr(</span>
  <span v-click="1">Input</span>
  <span>, </span>
  <span v-click="2">Left</span>
  <span>, </span>
  <span v-click="2">Right</span>
  <span>)</span>
</div>

<p v-click="1"><span font="mono">Input&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</span> <strong>Index</strong>, which input string is used.</p>
<p v-click="2"><span font="mono">Left, Right:</span> <strong>Position Expressions</strong>, the range of substring.</p>

<table class="mt-8" v-click="2">
  <thead>
    <tr>
      <th class="!font-bold">Name</th>
      <th class="!font-bold">Address</th>
      <th class="!font-bold">City</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td font="mono">A</td>
      <td font="mono" :class="$slidev.nav.clicks >= 3 && 'bg-green-100'">
        <span>Jiangsu, </span>
        <span v-click="4" class="font-bold text-blue-500">|</span>
        <span>nanjing</span>
        <span v-click="4" class="font-bold text-fuchsia-500">|</span>
        <span>, nju</span>
      </td>
      <td>
        <span v-click="2" font="mono">nanjing</span>
      </td>
    </tr>
  </tbody>
</table>

<div class="mt-8 font-mono text-center">
  <mdi-close v-click="5" class="text-red-500" />
  <span v-click="2">SubStr(</span>
  <span v-click="3" class="text-green-500">Address</span>
  <span v-click="2">, </span>
  <span v-click="4" class="text-blue-500">CPos(9)</span>
  <span v-click="2">, </span>
  <span v-click="4" class="text-fuchsia-500">CPos(-6)</span>
  <span v-click="2">)</span>
</div>

<div class="mt-4 font-mono text-center" v-click="5">
  <mdi-check class="text-green-500"  />
  <span>SubStr(</span>
  <span class="text-green-500">Address</span>
  <span>, </span>
  <span class="text-blue-500">Pos(ε,RE,2)</span>
  <span>, </span>
  <span class="text-fuchsia-500">Pos(RE,ε,2)</span>
  <span>)</span>
</div>

<div class="mt-2 font-mono text-center" v-click="5">
where RE = LowercaseTokens
</div>

---

# Regular Expressions

Only use a **small subset of regular expressions**.

Regular Expression is **a sequence of tokens**.

<blockquote v-click class="mt-8">
  <p font="mono" text="center">R = TokenSequence(LowercaseTokens, NumericTokens)</p>

  <p font="mono" text="center">R = [a-z]+ [0-9]+</p>
</blockquote>

<div v-click class="mt-8 flex items-center justify-center">
  <div>
    <p>No kleen star <span font="mono">([a-z]*)</span>.</p>
    <p>No disjunct operation <span font="mono">([a-z] | [0-9])</span>.</p>
  </div>
  <div>
    <mdi-arrow-right-bold />
  </div>
  <div>
    <span class="font-bold">Efficient Algorithm</span>
  </div>
</div>

---

# Conditionals

<!-- <div class="font-mono text-center">
  <span>Switch(</span>
  <span>(b, e)</span>
  <span>, ...</span>
  <span>)</span>
</div> -->

<img src="/ast.png" alt="ast" style="zoom: 80%">

<!-- $$
\begin{array}{rcl}
\text{Trace Expr  } ~ e & := & \text{Concatenation}(f_1, f_2, \dots, f_n) \\
\text{Atom Expr  } ~ f & := & \text{SubStr}(v_i, p_1, p_2) \\
& | & \text{ConstStr}(s) \\
% & | & \text{Loop}(\lambda w : e)
\end{array}
$$ -->

---

# Example

<div class="w-full">
  <flashfill edit :data="[
    { input: ['123', '321'], output: 'case 123: return 321;' },
    { input: ['456', '654'], output: 'case 456: return 654;' },
    { input: ['789', '987'] },
    { input: ['147', '741'] },
    { input: ['258', '852'] },
    { input: ['369', '963'] },
  ]" :input-label="['Num', 'Rev']" output-label="Code"
  :input-width="[240, 240]" :output-width="480" />
</div>

---

# Alogrithm

---
layout: center
class: text-center
---

# END

<div class="h-8"></div>

# Q & A
