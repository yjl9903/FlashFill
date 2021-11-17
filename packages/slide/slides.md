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

# String Manipulation Language

## Construct Output Strings

---

# Trace

Trace Expr is a <span class="font-bold underline">concatenation</span> of atom expressions, <span class="font-bold underline">substrings of inputs</span> or a <span class="font-bold underline">constant string</span>.

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

<mdi-arrow-right /> **A Sequence of Tokens**.

<blockquote v-click class="mt-8">
  <p font="mono" text="center">R = TokenSequence(LowercaseTokens, NumericTokens)</p>

  <p font="mono" text="center">R = [a-z]+ [0-9]+</p>
</blockquote>

<div v-click class="mt-8 flex items-center justify-center">
  <div>
    <p>No <span class="underline">kleen star</span> <span font="mono">([a-z]*)</span>.</p>
    <p>No <span class="underline">disjunct operation</span> <span font="mono">([a-z] | [0-9])</span>.</p>
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
    { input: ['147', '741'] },
    { input: ['258', '852'] },
  ]" :input-label="['Num', 'Rev']" output-label="Code"
  :input-width="[180, 180]" :output-width="600" />
</div>

<div font="mono">
  <p>Trace("case ", SubStr(Num, CPos(0), CPos(-1)),</p>
  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;": return ", SubStr(Rev, CPos(0), CPos(-1)),</p>
  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";")</p>
</div>

---

# Example

<div class="w-full">
  <flashfill class="mt-8" edit :data="[
    { input: ['Check-in: 2000 mora'], output: '2000 mora' },
    { input: ['New character: 180 fate'], output: '180 fate' },
    { input: ['Intertwined fate: 160 primogem'] },
    { input: ['New weapon: 240 fate'] }
  ]" :input-label="['Item']"
  :input-width="[540]" :output-width="240" />
</div>

<div font="mono">
  <p>Trace(SubStr(Item,</p>
  <p>Pos(TokenSeq(Colon, Space), TokenSeq(Numeric), -1),</p>
  <p>CPos(-1)))</p>
</div>

---
layout: center
class: text-center
---
# Alogrithom

## Synthesize a program with input-output examples

---
clicks: 3
---

# Goal

> Given some input-output examples $(i_1, o_1), \dots, (i_n, o_n)$,
> 
> Synthesize a program $P$ such that $P(i_1) = o_1, \dots, P(i_n)=o_n$.

<div class="h-4"></div>

1. <span v-click="1"><span class="font-bold underline">Synthesize $n$ programs $P_k$</span> such that</span>

<span v-click="1" class="flex justify-center">$P_1(i_1) = o_1, P_2(i_2) = o_2, \dots, P_n(i_n) = o_n$</span>

2. <span v-click="2"><span class="font-bold underline">Intersect programs</span> into non-empty paritions <strong>greedily</strong></span>

<span v-click="2" class="flex justify-center">$(\text{Intersect}(P_1, P_2), \{i_1, i_2\}), (\text{Intersect}(P_3, \dots), \{i_3, \dots\}), \dots$</span>

3. <span v-click="3"><span class="font-bold underline">Construct boolean classification</span> for partitions</span>

<span v-click="3" class="flex justify-center">$(\text{Boolean Expr}, \text{Intersect}(P_1, P_2)), \dots$</span>

<style>
ol {
  list-style-type: decimal;
}
</style>

---

# Generate Trace

> **Goal**. Synthesize $n$ programs $P_k$ such that
> 
> $$P_1(i_1) = o_1, P_2(i_2) = o_2, \dots, P_n(i_n) = o_n$$

---
layout: center
class: text-center
---

# END

<div class="h-8"></div>

# Q & A
