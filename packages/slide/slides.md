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

<div font="mono" text="center">
  <span>Trace(ConstStr(...), SubStr(...), ...)</span>
</div>

<div v-click class="w-full mt-4 text-center">
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

<div class="mt-8 flex items-center justify-center">
  <div v-click>
    <p>No <span class="underline">kleen star</span> <span font="mono">([a-z]*)</span>.</p>
    <p>No <span class="underline">disjunct operation</span> <span font="mono">([a-z] | [0-9])</span>.</p>
  </div>
  <div v-click>
    <mdi-arrow-right-bold />
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
  <p>Trace("<span class="underline">case </span>", <span font="bold">SubStr(Num, CPos(0), CPos(-1))</span>,</p>
  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span class="underline">: return </span>", <span font="bold">SubStr(Rev, CPos(0), CPos(-1))</span>,</p>
  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span class="underline">;</span>")</p>
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
  <p class="font-bold">Pos(TokenSeq(Colon, Space), TokenSeq(Numeric), -1),</p>
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

2. <span v-click="2"><span class="font-bold underline">Intersect programs</span> into non-empty partitions <strong>greedily</strong></span>

<span v-click="2" class="flex justify-center">$(P_1 \cap P_2, \{(i_1,o_1), (i_2,o_2)\}), (P_3 \cap \dots, \{(i_3,o_3), \dots\}), \dots$</span>

3. <span v-click="3"><span class="font-bold underline">Construct boolean classification</span> for partitions</span>

<span v-click="3" class="flex justify-center">$(\text{Boolean Expression}, P_1 \cap P_2), \dots$</span>

<style>
ol {
  list-style-type: decimal;
}
</style>

---
clicks: 5
---

# Generate Trace

> **Goal**. Synthesize $n$ programs $P_k$ such that
> 
> $$P_1(i_1) = o_1, P_2(i_2) = o_2, \dots, P_n(i_n) = o_n$$

<div class="mt-8 flex justify-center">
  <img v-click src="/abcdef.png" alt="abcdef" style="zoom: 48%;">
  <img v-click src="/bcdef.png" alt="bcdef" style="zoom: 48%;">
  <img v-click src="/cdef.png" alt="cdef" style="zoom: 48%;">
</div>

<p v-click="4" class="mt-8 mb-4" text="center">Iterative <span class="font-bold">all</span> possible trace expressions
  <span v-click="5" font="bold">?</span>
</p>

<span v-click="5">The number is <strong>exponential</strong> in the length of output</span> <span v-click="5">( $2^{n-1}$ ).</span>

---

# DAG

<span font="mono">Nodes</span> = <span class="font-bold underline">Each position</span> in the output string.

<span font="mono">Edges</span> = <span class="font-bold underline">Each substring</span> $(i, j)$ where $i < j$.

<div class="flex justify-center">
  <img src="/dag.png" alt="cdef" style="zoom: 50%;">
</div>

Example. $(0, 2) \to \texttt{ab}, (2, 4) \to \texttt{cd}$.

<!-- image -->

<div v-click text="center" class="mt-8">
The origin <span class="font-bold">exponential</span> problem <mdi-arrow-right /> <span class="font-bold underline">Quadratic</span> sub-problems!
</div>

---

# Generate Substring

<p text="center">
The origin <span class="font-bold">exponential</span> problem <mdi-arrow-right /> <span class="font-bold underline">Quadratic</span> sub-problems
</p>

> **Goal**. For **each of $n^2$ substrings**, find all possible **atom expressions** to generate it.

<span font="mono">Input&nbsp;&nbsp;:</span> 「Jiangsu, <span class="underline text-amber-500">nanjing</span>, nju」

<span font="mono">Program:</span> &nbsp;&nbsp;<span font="mono">ConstStr("nanjing")</span>

<span font="mono">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> <span font="mono">SubStr(Address, CPos(9), CPos(-6))</span>

<span font="mono">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> <span font="mono">SubStr(Address, CPos(9), CPos(16))</span>

<span font="mono">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> <span font="mono">...</span>

<!-- image -->

<p v-click>
  <span></span>
</p>

<p v-click-after font="bold" text="center">
  <span>Use Brute-force!</span>
</p>

---

# Generate Partitions

> **Goal**. Intersect programs into non-empty partitions
> 
> $$(P_1 \cap P_2, \{(i_1,o_1), (i_2,o_2)\}), (P_3 \cap \dots, \{(i_3,o_3), \dots\}), \dots$$

---

# Boolean Classification

> **Goal**. Construct boolean classification for partitions
>
> $$((\text{Predicate} \land \dots) \lor \dots, P_1 \cap P_2), \dots$$
> where
> $$\text{Predicate} := \text{Match}(\text{Input}, \text{RegExp}, \text{Times}) ~ | ~ \neg \text{Match}(\dots)$$

---
layout: center
class: text-center
---

# END

<div class="h-8"></div>

# Q & A
