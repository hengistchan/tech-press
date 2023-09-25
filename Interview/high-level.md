---
url: https://interview.poetries.top/docs/base/high-frequency.html#_1-css
title: 前端进阶之旅
date: 2023-09-25 12:28:38
tag: 
summary: 前端面试题进阶总结，按模块分类精心整理，打造最全面的前端面试题库，为你的前端面试之旅保驾护航！
---
# 高频面试题

## 1 CSS

### 盒模型

*   有两种， `IE`盒子模型、`W3C`盒子模型；
*   盒模型： 内容 (`content`)、填充 (`padding`)、边界 (`margin`)、 边框 (`border`)；
*   区 别： `IE`的`content`部分把 `border` 和 `padding`计算了进去;

**标准盒子模型的模型图**

![](<./high-level.assets/1695616118748.png>)

从上图可以看到：

*   盒子总宽度 = `width` + `padding` + `border` + `margin`;
*   盒子总高度 = `height` + `padding` + `border` + `margin`

也就是，`width/height` 只是内容高度，不包含 `padding` 和 `border` 值

**IE 怪异盒子模型**

![](<./high-level.assets/1695616118810.png>)

从上图可以看到：

*   盒子总宽度 = `width` + `margin`;
*   盒子总高度 = `height` + `margin`;

也就是，`width/height` 包含了 `padding` 和 `border`值

页面渲染时，`dom` 元素所采用的 布局模型。可通过`box-sizing`进行设置

**通过 box-sizing 来改变元素的盒模型**

CSS 中的 `box-sizing` 属性定义了引擎应该如何计算一个元素的总宽度和总高度

*   `box-sizing: content-box;` 默认的标准 (W3C) 盒模型元素效果，元素的 `width/height` 不包含`padding`，`border`，与标准盒子模型表现一致
*   `box-sizing: border-box;` 触发怪异 (IE) 盒模型元素的效果，元素的 `width/height` 包含 `padding`，`border`，与怪异盒子模型表现一致
*   `box-sizing: inherit;` 继承父元素 `box-sizing` 属性的值

**小结**

*   盒子模型构成：内容 (`content`)、内填充 (`padding`)、 边框 (`border`)、外边距 (`margin`)
*   `IE8`及其以下版本浏览器，未声明 `DOCTYPE`，内容宽高会包含内填充和边框，称为怪异盒模型 (`IE`盒模型)
*   标准 (`W3C`) 盒模型：元素宽度 = `width + padding + border + margin`
*   怪异 (`IE`) 盒模型：元素宽度 = `width + margin`
*   标准浏览器通过设置 css3 的 `box-sizing: border-box` 属性，触发 “怪异模式” 解析计算宽高

### BFC

块级格式化上下文，是一个独立的渲染区域，让处于 `BFC` 内部的元素与外部的元素相互隔离，使内外元素的定位不会相互影响。

`IE`下为 `Layout`，可通过 `zoom:1` 触发

**触发条件:**

*   根元素，即 HTML 元素
*   绝对定位元素 `position: absolute/fixed`
*   行内块元素 `display`的值为`inline-block`、`table`、`flex`、`inline-flex`、`grid`、`inline-grid`
*   浮动元素：`float`值为`left`、`right`
*   `overflow值`不为 `visible`，为 `auto`、`scroll`、`hidden`

**规则:**

1.  属于同一个 `BFC` 的两个相邻 `Box` 垂直排列
2.  属于同一个 `BFC` 的两个相邻 `Box` 的 `margin` 会发生重叠
3.  `BFC` 中子元素的 `margin box` 的左边， 与包含块 (BFC) `border box`的左边相接触 (子元素 `absolute` 除外)
4.  `BFC` 的区域不会与 `float` 的元素区域重叠
5.  计算 `BFC` 的高度时，浮动子元素也参与计算
6.  文字层不会被浮动层覆盖，环绕于周围

**应用:**

*   利用`2`：阻止`margin`重叠
*   利用`4`：自适应两栏布局
*   利用 `5` ，可以避免高度塌陷
*   可以包含浮动元素 —— 清除内部浮动 (清除浮动的原理是两个`div`都位于同一个 `BFC` 区域之中)

**示例**

**1. 防止 margin 重叠（塌陷）**

![](<./high-level.assets/1695616118847.png>)

*   两个`p`元素之间的距离为`100px`，发生了`margin`重叠（塌陷），以最大的为准，如果第一个`P`的`margin`为`80`的话，两个`P`之间的距离还是`100`，以最大的为准。
*   同一个`BFC`的俩个相邻的盒子的`margin`会发生重叠
*   可以在`p`外面包裹一层容器，并触发这个容器生成一个`BFC`，那么两个`p`就不属于同一个`BFC`，则不会出现`margin`重叠

这时候，边距则不会重叠：

![](<./high-level.assets/1695616118877.png>)

**2. 清除内部浮动**

![](<./high-level.assets/1695616118904.png>)

而`BFC`在计算高度时，浮动元素也会参与，所以我们可以触发`.par`元素生成`BFC`，则内部浮动元素计算高度时候也会计算

![](<./high-level.assets/1695616118932.png>)

**3. 自适应多栏布局**

这里举个两栏的布局

![](<./high-level.assets/1695616118963.png>)

*   每个元素的左外边距与包含块的左边界相接触
*   因此，虽然`.aslide`为浮动元素，但是 main 的左边依然会与包含块的左边相接触，而`BFC`的区域不会与浮动盒子重叠
*   所以我们可以通过触发`main`生成`BFC`，以此适应两栏布局

这时候，新的`BFC`不会与浮动的`.aside`元素重叠。因此会根据包含块的宽度，和`.aside`的宽度，自动变窄

![](<./high-level.assets/1695616118993.png>)

### 选择器权重计算方式

!important > 内联样式 = 外联样式 > ID 选择器 > 类选择器 = 伪类选择器 = 属性选择器 > 元素选择器 = 伪元素选择器 > 通配选择器 = 后代选择器 = 兄弟选择器

1.  属性后面加`!important`会覆盖页面内任何位置定义的元素样式
2.  作为`style`属性写在元素内的样式
3.  `id`选择器
4.  类选择器
5.  标签选择器
6.  通配符选择器（`*`）
7.  浏览器自定义或继承

**同一级别：后写的会覆盖先写的**

css 选择器的解析原则：选择器定位 DOM 元素是从右往左的方向，这样可以尽早的过滤掉一些不必要的样式规则和元素

### 清除浮动

1.  在浮动元素后面添加 `clear:both` 的空 `div` 元素

2.  给父元素添加 `overflow:hidden` 或者 `auto` 样式，触发`BFC`

3.  使用伪元素，也是在元素末尾添加一个点并带有 `clear: both` 属性的元素实现的。

推荐使用第三种方法，不会在页面新增 div，文档结构更加清晰

### 垂直居中的方案

1.  **利用绝对定位 + transform**，设置 `left: 50%` 和 `top: 50%` 现将子元素左上角移到父元素中心位置，然后再通过 `translate` 来调整子元素的中心点到父元素的中心。该方法可以**不定宽高**

2.  **利用绝对定位 + margin:auto**，子元素所有方向都为 `0` ，将 `margin` 设置为 `auto` ，由于宽高固定，对应方向实现平分，该方法必须**盒子有宽高**

3.  **利用绝对定位 + margin: 负值**，设置 `left: 50%` 和 `top: 50%` 现将子元素左上角移到父元素中心位置，然后再通过 `margin-left` 和 `margin-top` 以子元素自己的一半宽高进行负值赋值。该方法必须定宽高

4.  **利用 flex** ，最经典最方便的一种了，不用解释，**定不定宽高无所谓**

5.  **grid 网格布局**

6.  **table 布局**

设置父元素为`display:table-cell`，子元素设置 `display: inline-block`。利用`vertical`和`text-align`可以让所有的行内块级元素水平垂直居中

**小结**

不知道元素宽高大小仍能实现水平垂直居中的方法有：

*   `利用绝对定位+transform`
*   `flex`布局
*   `grid`布局

**根据元素标签的性质，可以分为：**

*   内联元素居中布局
*   块级元素居中布局

**内联元素居中布局**

*   水平居中
    *   行内元素可设置：`text-align: center`
    *   `flex`布局设置父元素：`display: flex; justify-content: center`
*   垂直居中
    *   单行文本父元素确认高度：`height === line-height`
    *   多行文本父元素确认高度：`display: table-cell; vertical-align: middle`

**块级元素居中布局**

*   水平居中
    *   定宽: `margin: 0 auto`
    *   `绝对定位+left:50%+margin:负自身一半`
*   垂直居中
    *   `position: absolute`设置`left`、`top`、`margin-left`、`margin-top`(定高)
    *   `display: table-cell`
    *   `transform: translate(x, y)`
    *   `flex`(不定高，不定宽)
    *   `grid`(不定高，不定宽)，兼容性相对比较差

### CSS3 的新特性

![](<./high-level.assets/1695616119022.png>)

**1. 是什么**

css，即层叠样式表（Cascading Style Sheets）的简称，是一种标记语言，由浏览器解释执行用来使页面变得更美观

`css3`是 css 的最新标准，是向后兼容的，`CSS1/2`的特性在 `CSS3` 里都是可以使用的

而 `CSS3` 也增加了很多新特性，为开发带来了更佳的开发体验

**2. 选择器**

`css3`中新增了一些选择器，主要为如下图所示：

![](<./high-level.assets/1695616120160.png>)

**3. 新样式**

*   **边框** `css3`新增了三个边框属性，分别是：
    *   `border-radius`：创建圆角边框
    *   `box-shadow`：为元素添加阴影
    *   `border-image`：使用图片来绘制边框
*   **box-shadow** 设置元素阴影，设置属性如下（其中水平阴影和垂直阴影是必须设置的）
    *   水平阴影
    *   垂直阴影
    *   模糊距离 (虚实)
    *   阴影尺寸 (影子大小)
    *   阴影颜色
    *   内 / 外阴影
*   **背景** 新增了几个关于背景的属性，分别是`background-clip`、`background-origin`、`background-size`和`background-break`
    *   **`background-clip`** 用于确定背景画区，有以下几种可能的属性：通常情况，背景都是覆盖整个元素的，利用这个属性可以设定背景颜色或图片的覆盖范围
        *   `background-clip: border-box`; 背景从`border`开始显示
        *   `background-clip: padding-box`; 背景从`padding`开始显示
        *   `background-clip: content-box`; 背景显`content`区域开始显示
        *   `background-clip: no-clip`; 默认属性，等同于 b`order-box`
    *   **`background-origin`** 当我们设置背景图片时，图片是会以左上角对齐，但是是以`border`的左上角对齐还是以`padding`的左上角或者`content`的左上角对齐? `border-origin`正是用来设置这个的
        *   `background-origin: border-box`; 从`border`开始计算`background-position`
        *   `background-origin: padding-box`; 从`padding`开始计算`background-position`
        *   `background-origin: content-box`; 从`content`开始计算`background-position`
        *   默认情况是`padding-box`，即以`padding`的左上角为原点
    *   **`background-size`** 常用来调整背景图片的大小，主要用于设定图片本身。有以下可能的属性：
        *   `background-size: contain`; 缩小图片以适合元素（维持像素长宽比）
        *   `background-size: cover`; 扩展元素以填补元素（维持像素长宽比）
        *   `background-size: 100px 100px`; 缩小图片至指定的大小
        *   `background-size: 50% 100%`; 缩小图片至指定的大小，百分比是相对包 含元素的尺寸
    *   **`background-break`** 元素可以被分成几个独立的盒子（如使内联元素`span`跨越多行），`background-break` 属性用来控制背景怎样在这些不同的盒子中显示
        *   `background-break: continuous`; 默认值。忽略盒之间的距离（也就是像元素没有分成多个盒子，依然是一个整体一样）
        *   `background-break: bounding-box`; 把盒之间的距离计算在内；
        *   `background-break: each-box`; 为每个盒子单独重绘背景
*   **文字**
    *   **`word-wrap: normal|break-word`**
        *   `normal`：使用浏览器默认的换行
        *   `break-all`：允许在单词内换行
    *   **`text-overflow`** 设置或检索当当前行超过指定容器的边界时如何显示，属性有两个值选择
        *   `clip`：修剪文本
        *   `ellipsis`：显示省略符号来代表被修剪的文本
    *   **`text-shadow`** 可向文本应用阴影。能够规定水平阴影、垂直阴影、模糊距离，以及阴影的颜色
    *   **`text-decoration`** CSS3 里面开始支持对文字的更深层次的渲染，具体有三个属性可供设置：
        *   `text-fill-color`: 设置文字内部填充颜色
        *   `text-stroke-color`: 设置文字边界填充颜色
        *   `text-stroke-width`: 设置文字边界宽度
*   **颜色**
    *   `css3`新增了新的颜色表示方式`rgba`与`hsla`
    *   `rgba`分为两部分，`rgb`为颜色值，`a`为透明度
    *   `hala`分为四部分，`h`为色相，`s`为饱和度，`l`为亮度，`a`为透明度

**4. transition 过渡**

`transition`属性可以被指定为一个或多个 CSS 属性的过渡效果，多个属性之间用逗号进行分隔，必须规定两项内容：

*   过度效果
*   持续时间

上面为简写模式，也可以分开写各个属性

**5. transform 转换**

*   `transform`属性允许你旋转，缩放，倾斜或平移给定元素
*   `transform-origin`：转换元素的位置（围绕那个点进行转换），默认值为`(x,y,z):(50%,50%,0)`

使用方式：

*   `transform: translate(120px, 50%)`：位移
*   `transform: scale(2, 0.5)`：缩放
*   `transform: rotate(0.5turn)`：旋转
*   `transform: skew(30deg, 20deg)`：倾斜

**6. animation 动画**

动画这个平常用的也很多，主要是做一个预设的动画。和一些页面交互的动画效果，结果和过渡应该一样，让页面不会那么生硬

`animation`也有很多的属性

*   `animation-name`：动画名称
*   `animation-duration`：动画持续时间
*   `animation-timing-function`：动画时间函数
*   `animation-delay`：动画延迟时间
*   `animation-iteration-count`：动画执行次数，可以设置为一个整数，也可以设置为 infinite，意思是无限循环
*   `animation-direction`：动画执行方向
*   `animation-paly-state`：动画播放状态
*   `animation-fill-mode`：动画填充模式

**7. 渐变**

颜色渐变是指在两个颜色之间平稳的过渡，`css3`渐变包括

*   `linear-gradient`：线性渐变 `background-image: linear-gradient(direction, color-stop1, color-stop2, ...)`;
*   `radial-gradient`：径向渐变 `linear-gradient(0deg, red, green)`

**8. 其他**

*   `Flex`弹性布局
*   `Grid`栅格布局
*   媒体查询 `@media screen and (max-width: 960px) {}`还有打印`print`

**transition 和 animation 的区别**

`Animation`和`transition`大部分属性是相同的，他们都是随时间改变元素的属性值，他们的主要区别是`transition`需要触发一个事件才能改变属性，而`animation`不需要触发任何事件的情况下才会随时间改变属性值，并且`transition`为 2 帧，从`from .... to`，而`animation`可以一帧一帧的

### CSS 动画和过渡

常见的动画效果有很多，如`平移`、`旋转`、`缩放`等等，复杂动画则是多个简单动画的组合

**css 实现动画的方式，有如下几种：**

*   `transition` 实现渐变动画
*   `transform` 转变动画
*   `animation` 实现自定义动画

**1. transition 实现渐变动画**

**transition 的属性如下：**

*   `transition-property:填写需要变化的css属性`
*   `transition-duration:完成过渡效果需要的时间单位(s或者ms)默认是 0`
*   `transition-timing-function:完成效果的速度曲线`
*   `transition-delay: （规定过渡效果何时开始。默认是`0`）`

一般情况下，我们都是写一起的，比如：`transition： width 2s ease 1s`

其中`timing-function`的值有如下：

<table><thead><tr><th>值</th><th>描述</th></tr></thead><tbody><tr><td><code>linear</code></td><td>匀速（等于 <code>cubic-bezier(0,0,1,1)</code>）</td></tr><tr><td><code>ease</code></td><td>从慢到快再到慢（<code>cubic-bezier(0.25,0.1,0.25,1)</code>）</td></tr><tr><td><code>ease-in</code></td><td>慢慢变快（等于 <code>cubic-bezier(0.42,0,1,1)</code>）</td></tr><tr><td><code>ease-out</code></td><td>慢慢变慢（等于 <code>cubic-bezier(0,0,0.58,1)</code>）</td></tr><tr><td><code>ease-in-out</code></td><td>先变快再到慢（等于 <code>cubic-bezier(0.42,0,0.58,1)</code>），渐显渐隐效果</td></tr><tr><td><code>cubic-bezier(*n*,*n*,*n*,*n*)</code></td><td>在 <code>cubic-bezier</code> 函数中定义自己的值。可能的值是 <code>0</code> 至 <code>1</code> 之间的数值</td></tr></tbody></table>

注意：并不是所有的属性都能使用过渡的，如`display:none<->display:block`

举个例子，实现鼠标移动上去发生变化动画效果

**2. transform 转变动画**

包含四个常用的功能：

*   `translate(x,y)`：位移
*   `scale`：缩放
*   `rotate`：旋转
*   `skew`：倾斜

一般配合`transition`过度使用

注意的是，`transform`不支持`inline元`素，使用前把它变成`block`

举个例子

可以看到盒子发生了旋转，倾斜，平移，放大

**3. animation 实现自定义动画**

一个关键帧动画，最少包含两部分，`animation` 属性及属性值（动画的名称和运行方式运行时间等）`@keyframes`（规定动画的具体实现过程）

`animation`是由 `8` 个属性的简写，分别如下：

<table><thead><tr><th>属性</th><th>描述</th><th>属性值</th></tr></thead><tbody><tr><td><code>animation-duration</code></td><td>指定动画完成一个周期所需要时间，单位秒（<code>s</code>）或毫秒（<code>ms</code>），默认是 <code>0</code></td><td></td></tr><tr><td><code>animation-timing-function</code></td><td>指定动画计时函数，即动画的速度曲线，默认是 "<code>ease</code>"</td><td><code>linear</code>、<code>ease</code>、<code>ease-in</code>、<code>ease-out</code>、<code>ease-in-out</code></td></tr><tr><td><code>animation-delay</code></td><td>指定动画延迟时间，即动画何时开始，默认是 <code>0</code></td><td></td></tr><tr><td><code>animation-iteration-count</code></td><td>指定动画播放的次数，默认是 <code>1</code>。但我们一般用<code>infinite</code>，一直播放</td><td></td></tr><tr><td><code>animation-direction</code> 指定动画播放的方向</td><td>默认是 <code>normal</code></td><td><code>normal</code>、<code>reverse</code>、<code>alternate</code>、<code>alternate-reverse</code></td></tr><tr><td><code>animation-fill-mode</code></td><td>指定动画填充模式。默认是 <code>none</code></td><td><code>forwards</code>、<code>backwards</code>、<code>both</code></td></tr><tr><td><code>animation-play-state</code></td><td>指定动画播放状态，正在运行或暂停。默认是 <code>running</code></td><td><code>running</code>、<code>pauser</code></td></tr><tr><td><code>animation-name</code></td><td>指定 <code>@keyframes</code> 动画的名称</td><td></td></tr></tbody></table>

`CSS` 动画只需要定义一些关键的帧，而其余的帧，浏览器会根据计时函数插值计算出来，

`@keyframes`定义关键帧，可以是`from->to`（等同于`0%`和`100%`），也可以是从`0%->100%`之间任意个的分层设置

因此，如果我们想要让元素旋转一圈，只需要定义开始和结束两帧即可：

`from` 表示最开始的那一帧，`to` 表示结束时的那一帧

**也可以使用百分比刻画生命周期**

定义好了关键帧后，下来就可以直接用它了：

**总结**

<table><thead><tr><th>属性</th><th>含义</th></tr></thead><tbody><tr><td><code>transition（过度）</code></td><td>用于设置元素的样式过度，和<code>animation</code>有着类似的效果，但细节上有很大的不同</td></tr><tr><td><code>transform（变形）</code></td><td>用于元素进行旋转、缩放、移动或倾斜，和设置样式的动画并没有什么关系，就相当于<code>color</code>一样用来设置元素的 “外表”</td></tr><tr><td><code>translate（移动）</code></td><td>只是<code>transform</code>的一个属性值，即移动</td></tr><tr><td><code>animation（动画）</code></td><td>用于设置动画属性，他是一个简写的属性，包含<code>6</code>个属性</td></tr></tbody></table>

**4. 用 css3 动画使一个图片旋转**

### 有哪些方式（CSS）可以隐藏页面元素

*   `opacity:0`：本质上是将元素的透明度将为`0`，就看起来隐藏了，但是依然占据空间且可以交互
*   `display:none`: 这个是彻底隐藏了元素，元素从文档流中消失，既不占据空间也不交互，也不影响布局
*   `visibility:hidden`: 与上一个方法类似的效果，占据空间，但是不可以交互了
*   `overflow:hidden`: 这个只隐藏元素溢出的部分，但是占据空间且不可交互
*   `z-index:-9999`: 原理是将层级放到底部，这样就被覆盖了，看起来隐藏了
*   `transform:scale(0,0)`: 平面变换，将元素缩放为`0`，但是依然占据空间，但不可交互

**display: none 与 visibility: hidden 的区别**

*   修改常规流中元素的`display`通常会造成文档重排。修改`visibility`属性只会造成本元素的重绘
*   读屏器不会读取`display:none`; 元素内容；会读取`visibility:hidden;`元素内容
*   `display:none`; 会让元素完全从渲染树中消失，渲染的时候不占据任何空间；`visibility:hidden`; 不会让元素从渲染树消失，渲染时元素继续占据空间，只是内容不可见
*   `display:none`; 是非继承属性，**子孙节点消失由于元素从渲染树消失造成，通过修改子孙节点属性无法显示**；`visibility:hidden;`是继承属性，**子孙节点消失由于继承了`hidden`，通过设置`visibility:visible;`可以让子孙节点显式**

### 说说 em/px/rem/vh/vw 区别

*   传统的项目开发中，我们只会用到`px`、`%`、`em`这几个单位，它可以适用于大部分的项目开发，且拥有比较良好的兼容性
*   从`CSS3`开始，浏览器对计量单位的支持又提升到了另外一个境界，新增了`rem`、`vh`、`vw`、`vm`等一些新的计量单位
*   利用这些新的单位开发出比较良好的响应式页面，适应多种不同分辨率的终端，包括移动设备等
*   在`css`单位中，可以分为长度单位、绝对单位，如下表所指示

<table><thead><tr><th><strong>CSS 单位</strong></th><th></th></tr></thead><tbody><tr><td>相对长度单位</td><td><code>em</code>、<code>ex</code>、<code>ch</code>、<code>rem</code>、<code>vw</code>、<code>vh</code>、<code>vmin</code>、<code>vmax</code>、<code>%</code></td></tr><tr><td>绝对长度单位</td><td><code>cm</code>、<code>mm</code>、<code>in</code>、<code>px</code>、<code>pt</code>、<code>pc</code></td></tr></tbody></table>

这里我们主要讲述`px`、`em`、`rem`、`vh`、`vw`

**px**

`px`，表示像素，所谓像素就是呈现在我们显示器上的一个个小点，每个像素点都是大小等同的，所以像素为计量单位被分在了绝对长度单位中

有些人会把`px`认为是相对长度，原因在于在移动端中存在设备像素比，`px`实际显示的大小是不确定的

这里之所以认为`px`为绝对单位，在于`px`的大小和元素的其他属性无关

**em**

`em`是相对长度单位。相对于当前对象内文本的字体尺寸。如当前对行内文本的字体尺寸未被人为设置，则相对于浏览器的默认字体尺寸（`1em = 16px`）

为了简化 `font-size` 的换算，我们需要在`css`中的 `body` 选择器中声明`font-size`= `62.5%`，这就使 em 值变为 `16px*62.5% = 10px`

这样 `12px = 1.2em`, `10px = 1em`, 也就是说只需要将你的原来的`px` 数值除以 10，然后换上 `em`作为单位就行了

特点：

*   `em` 的值并不是固定的
*   `em` 会继承父级元素的字体大小
*   `em` 是相对长度单位。相对于当前对象内文本的字体尺寸。如当前对行内文本的字体尺寸未被人为设置，则相对于浏览器的默认字体尺寸
*   任意浏览器的默认字体高都是 `16px`

举个例子

样式为

这时候`.big`元素的`font-size`为`14px`，而`.small`元素的`font-size`为 12px

**rem(常用)**

*   根据屏幕的分辨率动态设置`html`的文字大小，达到等比缩放的功能
*   保证`html`最终算出来的字体大小，不能小于`12px`
*   在不同的移动端显示不同的元素比例效果
*   如果`html`的`font-size:20px`的时候，那么此时的`1rem = 20px`
*   把设计图的宽度分成多少分之一，根据实际情况
*   `rem`做盒子的宽度，`viewport`缩放

`head`加入常见的`meta`属性

把这段代码加入`head`中的`script`预先加载

*   或者使用淘宝提供的库 [https://github.com/amfe/lib-flexible (opens new window)](https://github.com/amfe/lib-flexible)

**vh、vw**

`vw` ，就是根据窗口的宽度，分成`100`等份，`100vw`就表示满宽，`50vw`就表示一半宽。（`vw` 始终是针对窗口的宽），同理，`vh`则为窗口的高度

这里的窗口分成几种情况：

*   在桌面端，指的是浏览器的可视区域
*   移动端指的就是布局视口

像`vw`、`vh`，比较容易混淆的一个单位是`%`，不过百分比宽泛的讲是相对于父元素：

*   对于普通定位元素就是我们理解的父元素
*   对于`position: absolute;`的元素是相对于已定位的父元素
*   对于`position: fixed;`的元素是相对于 `ViewPort`（可视窗口）

**总结**

*   **px**：绝对单位，页面按精确像素展示
*   **%**：相对于父元素的宽度比例
*   **em**：相对单位，基准点为父节点字体的大小，如果自身定义了`font-size`按自身来计算（浏览器默认字体是`16px`），整个页面内`1em`不是一个固定的值
*   **rem**：相对单位，可理解为`root em`, 相对根节点`html`的字体大小来计算
*   **vh、vw**：主要用于页面视口大小布局，在页面布局上更加方便简单
    *   `vw`：屏幕宽度的`1%`
    *   `vh`：屏幕高度的`1%`
    *   `vmin`：取`vw`和`vh`中较小的那个（如：`10vh=100px 10vw=200px` 则`vmin=10vh=100px`）
    *   `vmax`：取`vw`和`vh`中较大的那个（如：`10vh=100px 10vw=200px` 则`vmax=10vw=200px`）

### flex 布局

很多时候我们会用到 `flex: 1` ，它具体包含了以下的意思

*   `flex-grow: 1` ：该属性默认为 `0` ，如果存在剩余空间，元素也不放大。设置为 `1`  代表会放大。
*   `flex-shrink: 1` ：该属性默认为 `1 ，如果空间不足，元素缩小。
*   `flex-basis: 0%` ：该属性定义在分配多余空间之前，元素占据的主轴空间。浏览器就是根据这个属性来计算是否有多余空间的。默认值为 `auto` ，即项目本身大小。设置为 `0%`  之后，因为有 `flex-grow`  和 `flex-shrink` 的设置会自动放大或缩小。在做两栏布局时，如果右边的自适应元素 `flex-basis`  设为`auto`  的话，其本身大小将会是 `0`

### 如果要做优化，CSS 提高性能的方法有哪些？

实现方式有很多种，主要有如下：

*   **内联首屏关键 CSS**
    *   在打开一个页面，页面首要内容出现在屏幕的时间影响着用户的体验，而通过内联`css`关键代码能够使浏览器在下载完`html`后就能立刻渲染
    *   而如果外部引用`css`代码，在解析`html`结构过程中遇到外部`css`文件，才会开始下载`css`代码，再渲染
    *   所以，`CSS`内联使用使渲染时间提前
    *   注意：但是较大的`css`代码并不合适内联（初始拥塞窗口、没有缓存），而其余代码则采取外部引用方式
*   **异步加载 CSS**
    *   在 CSS 文件请求、下载、解析完成之前，CSS 会阻塞渲染，浏览器将不会渲染任何已处理的内容
    *   前面加载内联代码后，后面的外部引用 css 则没必要阻塞浏览器渲染。这时候就可以采取异步加载的方案，主要有如下：
        
        *   使用 javascript 将`link`标签插到`head`标签最后
        
        *   设置`link`标签`media`属性为`noexis`，浏览器会认为当前样式表不适用当前类型，会在不阻塞页面渲染的情况下再进行下载。加载完成后，将 media 的值设为`screen`或`all`，从而让浏览器开始解析 CSS
        
        *   通过`rel`属性将`link`元素标记为`alternate`可选样式表，也能实现浏览器异步加载。同样别忘了加载完成之后，将`rel`设回`stylesheet`
*   **资源压缩**
    *   利用`webpack`、`gulp/grunt`、`rollup`等模块化工具，将`css`代码进行压缩，使文件变小，大大降低了浏览器的加载时间
*   **合理使用选择器**
    *   css 匹配的规则是从右往左开始匹配，例如`#markdown .content h3`匹配规则如下：
        *   先找到`h3`标签元素
        *   然后去除祖先不是`.content`的元素
        *   最后去除祖先不是`#markdown`的元素
    *   如果嵌套的层级更多，页面中的元素更多，那么匹配所要花费的时间代价自然更高
    *   所以我们在编写选择器的时候，可以遵循以下规则：
        *   不要嵌套使用过多复杂选择器，最好不要三层以上
        *   使用 id 选择器就没必要再进行嵌套
        *   通配符和属性选择器效率最低，避免使用
*   **减少使用昂贵的属性**
    *   在页面发生重绘的时候，昂贵属性如`box-shadow/border-radius/filter/透明度/:nth-child`等，会降低浏览器的渲染性能
*   **不要使用 @import**
    *   css 样式文件有两种引入方式，一种是`link`元素，另一种是`@import`
    *   `@import`会影响浏览器的并行下载，使得页面在加载时增加额外的延迟，增添了额外的往返耗时
    *   而且多个`@import`可能会导致下载顺序紊乱
    *   比如一个 css 文件`index.css`包含了以下内容：`@import url("reset.css")`
    *   那么浏览器就必须先把`index.css`下载、解析和执行后，才下载、解析和执行第二个文件`reset.css`
*   **其他**
    *   减少重排操作，以及减少不必要的重绘
    *   了解哪些属性可以继承而来，避免对这些属性重复编写
    *   `css Sprite`，合成所有`icon`图片，用宽高加上 b`ackgroud-position`的背景图方式显现出我们要的`icon`图，减少了`http`请求
    *   把小的`icon`图片转成`base64`编码
    *   CSS3 动画或者过渡尽量使用`transform`和`opacity`来实现动画，不要使用`left`和`top`属性

### 画一条 0.5px 的线

*   采用 `meta viewport` 的方式 `<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />`
*   采用 `border-image` 的方式
*   采用 `transform: scale()` 的方式

### 如何画一个三角形

三角形原理: 边框的均分原理

### 两栏布局：左边定宽，右边自适应方案

**利用 float + margin 实现**

**利用 calc 计算宽度**

**利用 float + overflow 实现**

**利用 flex 实现**

## 2 JavaScript

### typeof 类型判断

`typeof` 是否能正确判断类型？`instanceof` 能正确判断对象的原理是什么

*   `typeof` 对于原始类型来说，除了 `null` 都可以显示正确的类型

`typeof` 对于对象来说，除了函数都会显示 `object`，所以说 `typeof` 并不能准确判断变量到底是什么类型

如果我们想判断一个对象的正确类型，这时候可以考虑使用 `instanceof`，因为内部机制是通过原型链来判断的

对于原始类型来说，你想直接通过 `instanceof`来判断类型是不行的

*   `typeof`
    *   直接在计算机底层基于数据类型的值（二进制）进行检测
    *   `typeof null`为`object` 原因是对象存在在计算机中，都是以`000`开始的二进制存储，所以检测出来的结果是对象
    *   `typeof` 普通对象 / 数组对象 / 正则对象 / 日期对象 都是`object`
    *   `typeof NaN === 'number'`
*   `instanceof`
    *   检测当前实例是否属于这个类的
    *   底层机制：只要当前类出现在实例的原型上，结果都是 true
    *   不能检测基本数据类型
*   `constructor`
    *   支持基本类型
    *   `constructor`可以随便改，也不准
*   `Object.prototype.toString.call([val])`
    *   返回当前实例所属类信息

**写一个 getType 函数，获取详细的数据类型**

*   **获取类型**
    *   手写一个`getType`函数，传入任意变量，可准确获取类型
    *   如`number`、`string`、`boolean`等值类型
    *   引用类型`object`、`array`、`map`、`regexp`

### 类型转换

首先我们要知道，在 `JS` 中类型转换只有三种情况，分别是：

*   转换为布尔值
*   转换为数字
*   转换为字符串

![](<./high-level.assets/1695616120201.png>)

**转 Boolean**

在条件判断时，除了 `undefined`，`null`， `false`， `NaN`， `''`， `0`， `-0`，其他所有值都转为 `true`，包括所有对象

**对象转原始类型**

对象在转换类型的时候，会调用内置的 `[[ToPrimitive]]` 函数，对于该函数来说，算法逻辑一般来说如下

*   如果已经是原始类型了，那就不需要转换了
*   调用 `x.valueOf()`，如果转换为基础类型，就返回转换的值
*   调用 `x.toString()`，如果转换为基础类型，就返回转换的值
*   如果都没有返回原始类型，就会报错

当然你也可以重写 `Symbol.toPrimitive`，该方法在转原始类型时调用优先级最高。

**四则运算符**

它有以下几个特点：

*   运算中其中一方为字符串，那么就会把另一方也转换为字符串
*   如果一方不是字符串或者数字，那么会将它转换为数字或者字符串

*   对于第一行代码来说，触发特点一，所以将数字 `1` 转换为字符串，得到结果 `'11'`
*   对于第二行代码来说，触发特点二，所以将 `true` 转为数字 `1`
*   对于第三行代码来说，触发特点二，所以将数组通过 `toString`转为字符串 `1,2,3`，得到结果 `41,2,3`

另外对于加法还需要注意这个表达式 `'a' + + 'b'`

*   因为 `+ 'b'` 等于 `NaN`，所以结果为 `"aNaN"`，你可能也会在一些代码中看到过 `+ '1'`的形式来快速获取 `number` 类型。
*   那么对于除了加法的运算符来说，只要其中一方是数字，那么另一方就会被转为数字

**比较运算符**

*   如果是对象，就通过 `toPrimitive` 转换对象
*   如果是字符串，就通过 `unicode` 字符索引来比较

在以上代码中，因为 `a` 是对象，所以会通过 `valueOf` 转换为原始类型再比较值。

### 闭包

闭包的定义其实很简单：函数 `A` 内部有一个函数 `B`，函数 `B` 可以访问到函数 `A` 中的变量，那么函数 `B` 就是闭包

**闭包存在的意义就是让我们可以间接访问函数内部的变量**

经典面试题，循环中使用闭包解决 `var` 定义函数的问题

首先因为 `setTimeout` 是个异步函数，所以会先把循环全部执行完毕，这时候 `i`就是 `6` 了，所以会输出一堆 `6`

**解决办法有三种**

1.  第一种是使用闭包的方式

在上述代码中，我们首先使用了立即执行函数将 `i` 传入函数内部，这个时候值就被固定在了参数 `j` 上面不会改变，当下次执行 `timer` 这个闭包的时候，就可以使用外部函数的变量 `j`，从而达到目的

2.  第二种就是使用 `setTimeout` 的第三个参数，这个参数会被当成 `timer` 函数的参数传入

3.  第三种就是使用 `let` 定义 `i` 了来解决问题了，这个也是最为推荐的方式

### 原型与原型链

**原型关系**

*   每个`class`都有显示原型`prototype`
*   每个实例都有隐式原型`__proto__`
*   实例的`__proto__`指向`class`的`prototype`

![](<./high-level.assets/1695616120245.png>)

**基于原型的执行规则**

获取属性`xialuo.name`或执行方法`xialuo.sayhi`时，先在自身属性和方法查找，找不到就去`__proto__`中找

**原型链**

![](<./high-level.assets/1695616120838.png>)

### 原型继承和 Class 继承

涉及面试题：原型如何实现继承？`Class` 如何实现继承？`Class` 本质是什么？

首先先来讲下 `class`，其实在 `JS`中并不存在类，`class` 只是语法糖，本质还是函数

**组合继承**

组合继承是最常用的继承方式

*   以上继承的方式核心是在子类的构造函数中通过 `Parent.call(this)` 继承父类的属性，然后改变子类的原型为 `new Parent()` 来继承父类的函数。
*   这种继承方式优点在于构造函数可以传参，不会与父类引用属性共享，可以复用父类的函数，但是也存在一个缺点就是在继承父类函数的时候调用了父类构造函数，导致子类的原型上多了不需要的父类属性，存在内存上的浪费

**寄生组合继承**

这种继承方式对组合继承进行了优化，组合继承缺点在于继承父类函数时调用了构造函数，我们只需要优化掉这点就行了

以上继承实现的核心就是将父类的原型赋值给了子类，并且将构造函数设置为子类，这样既解决了无用的父类属性问题，还能正确的找到子类的构造函数。

**Class 继承**

以上两种继承方式都是通过原型去解决的，在 `ES6` 中，我们可以使用 `class` 去实现继承，并且实现起来很简单

`class` 实现继承的核心在于使用 `extends` 表明继承自哪个父类，并且在子类构造函数中必须调用 `super`，因为这段代码可以看成 `Parent.call(this, value)`。

### 模块化

涉及面试题：为什么要使用模块化？都有哪几种方式可以实现模块化，各有什么特点？

使用一个技术肯定是有原因的，那么使用模块化可以给我们带来以下好处

*   解决命名冲突
*   提供复用性
*   提高代码可维护性

**立即执行函数**

在早期，使用立即执行函数实现模块化是常见的手段，通过函数作用域解决了命名冲突、污染全局作用域的问题

**AMD 和 CMD**

鉴于目前这两种实现方式已经很少见到，所以不再对具体特性细聊，只需要了解这两者是如何使用的。

**CommonJS**

`CommonJS` 最早是 `Node` 在使用，目前也仍然广泛使用，比如在 `Webpack` 中你就能见到它，当然目前在 `Node` 中的模块管理已经和 `CommonJS`有一些区别了

虽然 `exports` 和 `module.exports` 用法相似，但是不能对 `exports` 直接赋值。因为 `var exports = module.exports` 这句代码表明了 `exports` 和 `module.exports`享有相同地址，通过改变对象的属性值会对两者都起效，但是**如果直接对 `exports` 赋值就会导致两者不再指向同一个内存地址，修改并不会对 `module.exports` 起效**

**ES Module**

`ES Module` 是原生实现的模块化方案，与 `CommonJS` 有以下几个区别

1.  `CommonJS` 支持动态导入，也就是 `require(${path}/xx.js)`，后者目前不支持，但是已有提案
2.  `CommonJS` 是同步导入，因为用于服务端，文件都在本地，同步导入即使卡住主线程影响也不大。而后者是异步导入，因为用于浏览器，需要下载文件，如果也采用同步导入会对渲染有很大影响
3.  `CommonJS` 在导出时都是值拷贝，就算导出的值变了，导入的值也不会改变，所以如果想更新值，必须重新导入一次。但是 `ES Module` 采用实时绑定的方式，导入导出的值都指向同一个内存地址，所以导入值会跟随导出值变化
4.  `ES Module` 会编译成 `require/exports`来执行的

### 事件机制

涉及面试题：事件的触发过程是怎么样的？知道什么是事件代理嘛？

**1. 事件触发三阶段**

**事件触发有三个阶段**：

*   `window`往事件触发处传播，遇到注册的捕获事件会触发
*   传播到事件触发处时触发注册的事件
*   从事件触发处往 `window` 传播，遇到注册的冒泡事件会触发

事件触发一般来说会按照上面的顺序进行，但是也有特例，如果给一个 `body` 中的子节点同时注册冒泡和捕获事件，事件触发会按照注册的顺序执行

**2. 注册事件**

通常我们使用 `addEventListener` 注册事件，该函数的第三个参数可以是布尔值，也可以是对象。对于布尔值 `useCapture` 参数来说，该参数默认值为 `false` ，`useCapture` 决定了注册的事件是捕获事件还是冒泡事件。对于对象参数来说，可以使用以下几个属性

*   `capture`：布尔值，和 `useCapture` 作用一样
*   `once`：布尔值，值为 `true` 表示该回调只会调用一次，调用后会移除监听
*   `passive`：布尔值，表示永远不会调用 `preventDefault`

一般来说，如果我们只希望事件只触发在目标上，这时候可以使用 `stopPropagation`来阻止事件的进一步传播。通常我们认为 `stopPropagation` 是用来阻止事件冒泡的，其实该函数也可以阻止捕获事件。`stopImmediatePropagation` 同样也能实现阻止事件，但是还能阻止该事件目标执行别的注册事件。

**3. 事件代理**

如果一个节点中的子节点是动态生成的，那么子节点需要注册事件的话应该注册在父节点上

**事件代理的方式相较于直接给目标注册事件来说，有以下优点**：

*   节省内存
*   不需要给子节点注销事件

### 箭头函数

*   箭头函数不绑定 `arguments`，可以使用 `...args` 代替
*   箭头函数没有 `prototype` 属性，不能进行 `new` 实例化
*   箭头函数不能通过 `call`、`apply` 等绑定 `this`，因为箭头函数底层是使用`bind`永久绑定`this`了，`bind`绑定过的`this`不能修改
*   箭头函数的`this`指向创建时父级的`this`
*   箭头函数不能使用`yield`关键字，不能作为`Generator`函数

**总结：不适用箭头函数的场景**

*   场景 1：对象方法
*   场景 2：对象原型
*   场景 3：构造函数
*   场景 4：动态上下文的回调函数
*   场景 5：vue 的生命周期和`method`

### JS 内存泄露如何检测？场景有哪些？

**内存泄漏**：当一个对象不再被使用，但是由于某种原因，它的内存没有被释放，这就是内存泄漏。

**1. 垃圾回收机制**

*   对于在 JavaScript 中的字符串，对象，数组是没有固定大小的，只有当对他们进行动态分配存储时，解释器就会分配内存来存储这些数据，当 JavaScript 的解释器消耗完系统中所有可用的内存时，就会造成系统崩溃。
*   内存泄漏，在某些情况下，不再使用到的变量所占用内存没有及时释放，导致程序运行中，内存越占越大，极端情况下可以导致系统崩溃，服务器宕机。
*   JavaScript 有自己的一套垃圾回收机制，JavaScript 的解释器可以检测到什么时候程序不再使用这个对象了（数据），就会把它所占用的内存释放掉。
*   针对 JavaScript 的垃圾回收机制有以下两种方法（常用）：标记清除（现代），引用计数（之前）

**有两种垃圾回收策略：**

*   **标记清除**：标记阶段即为所有活动对象做上标记，清除阶段则把没有标记（也就是非活动对象）销毁。
*   **引用计数**：它把对象是否不再需要简化定义为对象有没有其他对象引用到它。如果没有引用指向该对象（引用计数为 `0`），对象将被垃圾回收机制回收

**标记清除的缺点：**

*   **内存碎片化**，空闲内存块是不连续的，容易出现很多空闲内存块，还可能会出现分配所需内存过大的对象时找不到合适的块。
*   **分配速度慢**，因为即便是使用 `First-fit` 策略，其操作仍是一个 `O(n)` 的操作，最坏情况是每次都要遍历到最后，同时因为碎片化，大对象的分配效率会更慢。

解决以上的缺点可以使用 **标记整理（Mark-Compact）算法** 标记结束后，标记整理算法会将活着的对象（即不需要清理的对象）向内存的一端移动，最后清理掉边界的内存（如下图）

![](<./high-level.assets/1695616121342.png>)

**引用计数的缺点：**

*   需要一个计数器，所占内存空间大，因为我们也不知道被引用数量的上限。
*   `解决不了循环引用导致的无法回收问题`
    *   `IE 6、7`，`JS`对象和`DOM`对象循环引用，清除不了，导致内存泄露

`V8` 的垃圾回收机制也是基于标记清除算法，不过对其做了一些优化。

*   针对新生区采用并行回收。
*   针对老生区采用增量标记与惰性回收

**注意**：`闭包不是内存泄露，闭包的数据是不可以被回收的`

**拓展：WeakMap、WeakMap 的作用**

*   作用是`防止内存泄露的`
*   `WeakMap`、`WeakMap`的应用场景
    *   想临时记录数据或关系
    *   在`vue3`中大量使用了`WeakMap`
*   `WeakMap`的`key`只能是对象，不能是基本类型

**2. 如何检测内存泄露**

内存泄露模拟

打开开发者工具，选择 `Performance`，点击 `Record`，然后点击 `Stop`，在 `Memory` 选项卡中可以看到内存的使用情况。

![](<./high-level.assets/1695616122264.png>)

![](<./high-level.assets/1695616122299.png>)

![](<./high-level.assets/1695616122335.png>)

**3. 内存泄露的场景（Vue 为例）**

*   被全局变量、函数引用，组件销毁时未清除
*   被全局事件、定时器引用，组件销毁时未清除
*   被自定义事件引用，组件销毁时未清除

**4. 拓展 WeakMap WeakSet**

`weakmap` 和 `weakset` 都是弱引用，不会阻止垃圾回收机制回收对象。

### async/await 异步总结

**知识点总结**

*   `promise.then`链式调用，但也是基于回调函数
*   `async/await`是同步语法，彻底消灭回调函数

**async/await 和 promise 的关系**

*   执行`async`函数，返回的是`promise`

*   `await`相当于`promise`的`then`
*   `try catch`可捕获异常，代替了`promise`的`catch`
*   `await` 后面跟 `Promise` 对象：会阻断后续代码，等待状态变为 `fulfilled` ，才获取结果并继续执行
*   `await` 后续跟非 `Promise` 对象：会直接返回

*   `try...catch` 捕获 `rejected` 状态

**总结来看：**

*   `async` 封装 `Promise`
*   `await` 处理 `Promise` 成功
*   `try...catch` 处理 `Promise` 失败

**异步本质**

`await` 是同步写法，但本质还是异步调用。

即，只要遇到了 `await` ，后面的代码都相当于放在 `callback`(微任务) 里。

**执行顺序问题**

网上很经典的面试题

**关于 for...of**

*   `for in`以及`forEach`都是常规的同步遍历
*   `for of`用于异步遍历

### Promise 异步总结

**知识点总结**

*   **三种状态**
    *   `pending`、`fulfilled`(通过`resolve`触发)、`rejected`(通过`reject`触发)
    *   `pending => fulfilled`或者`pending => rejected`
    *   状态变化不可逆
*   **状态的表现和变化**
    *   `pending`状态，不会触发`then`和`catch`
    *   `fulfilled`状态会触发后续的`then`回调
    *   `rejected`状态会触发后续的`catch`回调
*   **then 和 catch 对状态的影响（重要）**
    
    *   `then`正常返回`fulfilled`，里面有报错返回`rejected`
    
    *   `catch`正常返回`fulfilled`，里面有报错返回`rejected`

**promise then 和 catch 的链接**

### Event Loop 执行机制过程

![](<./high-level.assets/1695616122393.png>)

![](<./high-level.assets/1695616123962.png>)

![](<./high-level.assets/1695616124001.png>)

*   同步代码一行行放到`Call Stack`执行，执行完就出栈
*   遇到异步优先记录下，等待时机（定时、网络请求）
*   时机到了就移动到`Call Queue`(宏任务队列)
    *   如果遇到微任务（如`promise.then`）放到微任务队列
    *   宏任务队列和微任务队列是分开存放的
        *   因为微任务是`ES6`语法规定的
        *   宏任务 (`setTimeout`) 是浏览器规定的
*   如果`Call Stack`为空，即同步代码执行完，`Event Loop`开始工作
    *   `Call Stack`为空，尝试先`DOM`渲染，在触发下一次`Event Loop`
*   轮询查找`Event Loop`，如有则移动到`Call Stack`
*   然后继续重复以上过程（类似永动机）

**DOM 事件和 Event Loop**

`DOM`事件会放到`Web API中`等待用户点击，放到`Call Queue`，在移动到`Call Stack`执行

![](<./high-level.assets/1695616124092.png>)

*   `JS`是单线程的，异步 (`setTimeout`、`Ajax`) 使用回调，基于`Event Loop`
*   `DOM`事件也使用回调，`DOM`事件非异步，但也是基于`Event Loop`实现

**宏任务和微任务**

*   **介绍**
    *   宏任务：`setTimeout` 、`setInterval` 、`DOM`事件、`Ajax`
    *   微任务：`Promise.then`、`async/await`
    *   微任务比宏任务执行的更早
*   **event loop 和 DOM 渲染**
    *   每次`call stack`清空（每次轮询结束），即同步代码执行完。都是`DOM`重新渲染的机会，`DOM`结构如有改变重新渲染
    *   再次触发下一次`Event Loop`
*   **宏任务和微任务的区别**
    *   宏任务：`DOM` 渲染后再触发，如`setTimeout`
    *   微任务：`DOM` 渲染前会触发，如`Promise`

再深入思考一下：为何两者会有以上区别，一个在渲染前，一个在渲染后？

*   **微任务**：`ES` 语法标准之内，`JS` 引擎来统一处理。即，不用浏览器有任何干预，即可一次性处理完，更快更及时。
*   **宏任务**：`ES` 语法没有，`JS` 引擎不处理，浏览器（或 `nodejs`）干预处理。

![](<./high-level.assets/1695616124182.png>)

总结：正确的一次 Event loop 顺序是这样

*   执行同步代码，这属于宏任务
*   执行栈为空，查询是否有微任务需要执行
*   执行所有微任务
*   必要的话渲染 `UI`
*   然后开始下一轮 `Event loop`，执行宏任务中的异步代码

通过上述的 `Event loop` 顺序可知，如果宏任务中的异步代码有大量的计算并且需要操作 `DOM` 的话，为了更快的响应界面响应，我们可以把操作 `DOM` 放入微任务中

## 3 浏览器

### 储存

涉及面试题：有几种方式可以实现存储功能，分别有什么优缺点？什么是 `Service Worker`？

**cookie，localStorage，sessionStorage，indexDB**

<table><thead><tr><th>特性</th><th>cookie</th><th>localStorage</th><th>sessionStorage</th><th>indexDB</th></tr></thead><tbody><tr><td>数据生命周期</td><td>一般由服务器生成，可以设置过期时间</td><td>除非被清理，否则一直存在</td><td>页面关闭就清理</td><td>除非被清理，否则一直存在</td></tr><tr><td>数据存储大小</td><td><code>4KB</code></td><td><code>5M</code></td><td><code>5M</code></td><td>无限</td></tr><tr><td>与服务端通信</td><td>每次都会携带在 <code>header</code> 中，对于请求性能影响</td><td>不参与</td><td>不参与</td><td>不参与</td></tr></tbody></table>

从上表可以看到，`cookie` 已经不建议用于存储。如果没有大量数据存储需求的话，可以使用 `localStorage` 和 `sessionStorage` 。对于不怎么改变的数据尽量使用 `localStorage` 存储，否则可以用 `sessionStorage`存储

**对于 cookie 来说，我们还需要注意安全性。**

<table><thead><tr><th>属性</th><th>作用</th></tr></thead><tbody><tr><td><code>value</code></td><td>如果用于保存用户登录态，应该将该值加密，不能使用明文的用户标识</td></tr><tr><td><code>http-only</code></td><td>不能通过 <code>JS</code> 访问 <code>Cookie</code>，减少 <code>XSS</code> 攻击</td></tr><tr><td><code>secure</code></td><td>只能在协议为 <code>HTTPS</code> 的请求中携带</td></tr><tr><td><code>same-site</code></td><td>规定浏览器不能在跨域请求中携带 <code>Cookie</code>，减少 <code>CSRF</code> 攻击</td></tr></tbody></table>

**Service Worker**

*   `Service Worker` 是运行在浏览器背后的独立线程，一般可以用来实现缓存功能。使用 `Service Worker`的话，传输协议必须为 `HTTPS`。因为 `Service Worker` 中涉及到请求拦截，所以必须使用 `HTTPS` 协议来保障安全
*   `Service Worker` 实现缓存功能一般分为三个步骤：首先需要先注册 `Service Worker`，然后监听到 `install` 事件以后就可以缓存需要的文件，那么在下次用户访问的时候就可以通过拦截请求的方式查询是否存在缓存，存在缓存的话就可以直接读取缓存文件，否则就去请求数据。以下是这个步骤的实现：

打开页面，可以在开发者工具中的 `Application` 看到 `Service Worker` 已经启动了

在 `Cache` 中也可以发现我们所需的文件已被缓存

![](<./high-level.assets/1695616125644.png>)

当我们重新刷新页面可以发现我们缓存的数据是从 `Service Worker` 中读取的

### 浏览器缓存机制

注意：该知识点属于性能优化领域，并且整一章节都是一个面试题

*   缓存可以说是性能优化中简单高效的一种优化方式了，它可以显著减少网络传输所带来的损耗。
*   对于一个数据请求来说，可以分为发起网络请求、后端处理、浏览器响应三个步骤。浏览器缓存可以帮助我们在第一和第三步骤中优化性能。比如说直接使用缓存而不发起请求，或者发起了请求但后端存储的数据和前端一致，那么就没有必要再将数据回传回来，这样就减少了响应数据。

接下来的内容中我们将通过以下几个部分来探讨浏览器缓存机制：

*   缓存位置
*   缓存策略
*   实际场景应用缓存策略

**1. 缓存位置**

从缓存位置上来说分为四种，并且各自有优先级，当依次查找缓存且都没有命中的时候，才会去请求网络

1.  `Service Worker`
2.  `Memory Cache`
3.  `Disk Cache`
4.  `Push Cache`
5.  网络请求

**1.1 Service Worker**

*   `service Worker` 的缓存与浏览器其他内建的缓存机制不同，它可以让我们自由控制缓存哪些文件、如何匹配缓存、如何读取缓存，并且缓存是持续性的。
*   当 `Service Worker` 没有命中缓存的时候，我们需要去调用 `fetch` 函数获取数据。也就是说，如果我们没有在 `Service Worker` 命中缓存的话，会根据缓存查找优先级去查找数据。但是不管我们是从 `Memory Cache` 中还是从网络请求中获取的数据，浏览器都会显示我们是从 `Service Worker` 中获取的内容。

**1.2 Memory Cache**

*   `Memory Cache` 也就是内存中的缓存，读取内存中的数据肯定比磁盘快。但是内存缓存虽然读取高效，可是缓存持续性很短，会随着进程的释放而释放。 一旦我们关闭 `Tab` 页面，内存中的缓存也就被释放了。
*   当我们访问过页面以后，再次刷新页面，可以发现很多数据都来自于内存缓存

![](<./high-level.assets/1695616126273.png>)

那么既然内存缓存这么高效，我们是不是能让数据都存放在内存中呢？

*   先说结论，这是不可能的。首先计算机中的内存一定比硬盘容量小得多，操作系统需要精打细算内存的使用，所以能让我们使用的内存必然不多。内存中其实可以存储大部分的文件，比如说 `JS`、`HTML`、`CSS`、图片等等
*   当然，我通过一些实践和猜测也得出了一些结论：
*   对于大文件来说，大概率是不存储在内存中的，反之优先当前系统内存使用率高的话，文件优先存储进硬盘

**1.3 Disk Cache**

*   `Disk Cache` 也就是存储在硬盘中的缓存，读取速度慢点，但是什么都能存储到磁盘中，比之 `Memory Cache` 胜在容量和存储时效性上。
*   在所有浏览器缓存中，`Disk Cache` 覆盖面基本是最大的。它会根据 `HTTP Herder` 中的字段判断哪些资源需要缓存，哪些资源可以不请求直接使用，哪些资源已经过期需要重新请求。并且即使在跨站点的情况下，相同地址的资源一旦被硬盘缓存下来，就不会再次去请求数据

**1.4 Push Cache**

*   `Push Cache` 是 `HTTP/2` 中的内容，当以上三种缓存都没有命中时，它才会被使用。并且缓存时间也很短暂，只在会话（`Session`）中存在，一旦会话结束就被释放。
*   `Push Cache` 在国内能够查到的资料很少，也是因为 `HTTP/2` 在国内不够普及，但是 `HTTP/2` 将会是日后的一个趋势

结论

*   所有的资源都能被推送，但是 `Edge` 和 `Safari` 浏览器兼容性不怎么好
*   可以推送 `no-cache` 和 `no-store` 的资源
*   一旦连接被关闭，`Push Cache` 就被释放
*   多个页面可以使用相同的 `HTTP/2` 连接，也就是说能使用同样的缓存
*   `Push Cache` 中的缓存只能被使用一次
*   浏览器可以拒绝接受已经存在的资源推送
*   你可以给其他域名推送资源

**1.5 网络请求**

*   如果所有缓存都没有命中的话，那么只能发起请求来获取资源了。
*   那么为了性能上的考虑，大部分的接口都应该选择好缓存策略，接下来我们就来学习缓存策略这部分的内容

**2 缓存策略**

通常浏览器缓存策略分为两种：强缓存和协商缓存，并且缓存策略都是通过设置 `HTTP Header` 来实现的

**2.1 强缓存**

强缓存可以通过设置两种 `HTTP Header` 实现：`Expires` 和 `Cache-Control` 。强缓存表示在缓存期间不需要请求，`state code` 为 `200`

**Expires**

`Expires` 是 `HTTP/1` 的产物，表示资源会在 `Wed, 22 Oct 2018 08:41:00 GMT` 后过期，需要再次请求。并且 `Expires` 受限于本地时间，如果修改了本地时间，可能会造成缓存失效。

**Cache-control**

*   `Cache-Control` 出现于 `HTTP/1.1`，优先级高于 `Expires` 。该属性值表示资源会在 `30` 秒后过期，需要再次请求。
*   `Cache-Control` 可以在请求头或者响应头中设置，并且可以组合使用多种指令

![](<./high-level.assets/1695616126819.png>)

从图中我们可以看到，我们可以将多个指令配合起来一起使用，达到多个目的。比如说我们希望资源能被缓存下来，并且是客户端和代理服务器都能缓存，还能设置缓存失效时间等

**一些常见指令的作用**

![](<./high-level.assets/1695616128014.png>)

**2.2 协商缓存**

*   如果缓存过期了，就需要发起请求验证资源是否有更新。协商缓存可以通过设置两种 `HTTP Header` 实现：`Last-Modified` 和 `ETag`
*   当浏览器发起请求验证资源时，如果资源没有做改变，那么服务端就会返回 `304` 状态码，并且更新浏览器缓存有效期。

![](<./high-level.assets/1695616128605.png>)

**Last-Modified 和 If-Modified-Since**

`Last-Modified` 表示本地文件最后修改日期，`If-Modified-Since` 会将 `Last-Modified` 的值发送给服务器，询问服务器在该日期后资源是否有更新，有更新的话就会将新的资源发送回来，否则返回 `304` 状态码。

但是 `Last-Modified` 存在一些弊端：

*   如果本地打开缓存文件，即使没有对文件进行修改，但还是会造成 `Last-Modified` 被修改，服务端不能命中缓存导致发送相同的资源
*   因为 `Last-Modified` 只能以秒计时，如果在不可感知的时间内修改完成文件，那么服务端会认为资源还是命中了，不会返回正确的资源 因为以上这些弊端，所以在 `HTTP / 1.1` 出现了 `ETag`

**ETag 和 If-None-Match**

*   `ETag` 类似于文件指纹，`If-None-Match` 会将当前 `ETag` 发送给服务器，询问该资源 `ETag` 是否变动，有变动的话就将新的资源发送回来。并且 `ETag` 优先级比 `Last-Modified` 高。

以上就是缓存策略的所有内容了，看到这里，不知道你是否存在这样一个疑问。如果什么缓存策略都没设置，那么浏览器会怎么处理？

对于这种情况，浏览器会采用一个启发式的算法，通常会取响应头中的 `Date` 减去 `Last-Modified` 值的 `10%` 作为缓存时间。

**2.3 实际场景应用缓存策略**

**频繁变动的资源**

对于频繁变动的资源，首先需要使用 `Cache-Control: no-cache` 使浏览器每次都请求服务器，然后配合 `ETag` 或者 `Last-Modified` 来验证资源是否有效。这样的做法虽然不能节省请求数量，但是能显著减少响应数据大小。

**代码文件**

这里特指除了 `HTML` 外的代码文件，因为 `HTML` 文件一般不缓存或者缓存时间很短。

一般来说，现在都会使用工具来打包代码，那么我们就可以对文件名进行哈希处理，只有当代码修改后才会生成新的文件名。基于此，我们就可以给代码文件设置缓存有效期一年 `Cache-Control: max-age=31536000`，这样只有当 `HTML` 文件中引入的文件名发生了改变才会去下载最新的代码文件，否则就一直使用缓存

更多缓存知识详解 http://blog.poetries.top/2019/01/02/browser-cache

### 从输入 URL 到网页显示的完整过程

*   **网络请求**
    *   `DNS`查询（得到`IP`)，建立`TCP`连接（三次握手）
    *   浏览器发送`HTTP`请求
    *   收到请求响应，得到`HTML`源码。继续请求静态资源
        *   在解析`HTML`过程中，遇到静态资源（`JS`、`CSS`、图片等）还会继续发起网络请求
        *   静态资源可能有缓存
*   **解析：字符串 => 结构化数据**
    *   `HTML`构建`DOM`树
    *   `CSS`构建`CSSOM`树（`style tree`）
    *   两者结合，形成`render tree`
    *   优化解析
        *   `CSS`放在`<head/>`中，不要异步加载`CSS`
        *   `JS`放到`<body/>`下面，不阻塞`HTML`解析（或结合`defer`、`async`）
        *   `<img />`提前定义`width`、`height`，避免页面重新渲染
*   **渲染：Render Tree 绘制到页面**
    *   计算`DOM`的尺寸、定位，最后绘制到页面
    *   遇到`JS`会执行，阻塞`HTML`解析。如果设置了`defer`，则并行下载`JS`，等待`HTML`解析完，在执行`JS`；如果设置了`async`，则并行下载`JS`，下载完立即执行，在继续解析`HTML`（`JS`是单线程的，`JS`执行和`DOM`渲染互斥，等`JS`执行完，在解析渲染`DOM`）
    *   异步`CSS`、异步图片，可能会触发重新渲染

![](<./high-level.assets/1695616129204.png>)

**连环问：网页重绘 repaint 和重排 reflow 有什么区别**

*   **重绘**
    *   元素外观改变：如颜色、背景色
    *   但元素的尺寸、定位不变，不会影响其他元素的位置
*   **重排**
    *   重新计算尺寸和布局，可能会影响其他元素的位置
    *   如元素高度的增加，可能会使相邻的元素位置改变
    *   重排必定触发重绘，重绘不一定触发重排。重绘的开销较小，重排的代价较高。
    *   **减少重排的方法**
        *   使用`BFC`特性，不影响其他元素位置
        *   频繁触发（`resize`、`scroll`）使用节流和防抖
        *   使用`createDocumentFragment`批量操作`DOM`
        *   编码上，避免连续多次修改，可通过合并修改，一次触发
        *   对于大量不同的 `dom` 修改，可以先将其脱离文档流，比如使用绝对定位，或者 `display:none`，在文档流外修改完成后再放回文档里中
        *   动画实现的速度的选择，动画速度越快，回流次数越多，也可以选择使用 `requestAnimationFrame`
        *   `css3` 硬件加速，`transform`、`opacity`、`filters`，开启后，会新建渲染层

### 常见的 web 前端攻击方式有哪些

**XSS**

*   `Cross Site Script` 跨站脚本攻击
*   手段：黑客将 JS 代码插入到网页内容中，渲染时执行`JS`代码
*   预防：特殊字符串替换（前端或后端）

**CSRF**

*   `Cross Site Request Forgery` 跨站请求伪造
*   手段：黑盒诱导用户去访问另一个网站的接口，伪造请求
*   预防：严格的跨域限制 + 验证码机制
    *   判断 `referer`
    *   为`cookie`设置`sameSite`属性，禁止第三方网页跨域的请求能携带上`cookie`
    *   使用`token`
    *   关键接口使用短信验证码

注意：偷取`cookie`是`XSS`做的事，`CSRF`的作用是借用`cookie`，并不能获取`cookie`

**CSRF 攻击攻击原理及过程如下：**

*   用户登录了`A`网站，有了`cookie`
*   黑盒诱导用户到`B`网站，并发起`A`网站的请求
*   `A`网站的`API`发现有`cookie`，会在请求中携带`A`网站的`cookie`，认为是用户自己操作的

**点击劫持**

*   手段：诱导界面上设置透明的`iframe`，诱导用户点击
*   预防：让`iframe`不能跨域加载

![](<./high-level.assets/1695616130441.png>)

**DDOS**

*   `Distribute denial-of-service` 分布式拒绝服务
*   手段：分布式的大规模的流量访问，使服务器瘫痪
*   预防：软件层不好做，需硬件预防（如阿里云的`WAF` 购买高防）

**SQL 注入**

*   手段：黑客提交内容时，写入`sql`语句，破坏数据库
*   预防：处理内容的输入，替换特殊字符

### 跨域方案

因为浏览器出于安全考虑，有同源策略。也就是说，如果`协议`、`域名`、`端口`有一个不同就是跨域，`Ajax` 请求会失败。

我们可以通过以下几种常用方法解决跨域的问题

**4.1 JSONP**

`JSONP` 的原理很简单，就是利用 `<script>` 标签没有跨域限制的漏洞。通过 `<script>` 标签指向一个需要访问的地址并提供一个回调函数来接收数据

**涉及到的端**

`JSONP` 需要服务端和前端配合实现。

`JSONP` 使用简单且兼容性不错，但是**只限于 `get` 请求**

**具体实现方式**

*   在开发中可能会遇到多个 `JSONP` 请求的回调函数名是相同的，这时候就需要自己封装一个 `JSONP`，以下是简单实现

**4.2 CORS**

`CORS` （Cross-Origin Resource Sharing，跨域资源共享） 是目前最为广泛的解决跨域问题的方案。方案依赖服务端 / 后端在响应头中添加 Access-Control-Allow-* 头，告知浏览器端通过此请求

**涉及到的端**

`CORS` 只需要服务端 / 后端支持即可，不涉及前端改动

*   `CORS`需要浏览器和后端同时支持。`IE 8` 和 `9` 需要通过 `XDomainRequest` 来实现。
*   浏览器会自动进行 `CORS` 通信，实现`CORS`通信的关键是后端。只要后端实现了 `CORS`，就实现了跨域。
*   服务端设置 `Access-Control-Allow-Origin` 就可以开启 `CORS`。 该属性表示哪些域名可以访问资源，如果设置通配符则表示所有网站都可以访问资源。

`CORS` 实现起来非常方便，只需要增加一些 `HTTP` 头，让服务器能声明允许的访问来源

只要后端实现了 `CORS`，就实现了跨域

![](<./high-level.assets/1695616131251.png>)

以 `koa`框架举例

添加中间件，直接设置`Access-Control-Allow-Origin`请求头

**具体实现方式**

`CORS` 将请求分为简单请求（Simple Requests）和需预检请求（Preflighted requests），不同场景有不同的行为

*   **简单请求**：不会触发预检请求的称为简单请求。当请求满足以下条件时就是一个简单请求：
    *   请求方法：`GET`、`HEAD`、`POST`。
    *   请求头：`Accept`、`Accept-Language`、`Content-Language`、`Content-Type`。
        *   `Content-Type` 仅支持：`application/x-www-form-urlencoded`、`multipart/form-data`、`text/plain`
*   **需预检请求**：当一个请求不满足以上简单请求的条件时，浏览器会自动向服务端发送一个 `OPTIONS` 请求，通过服务端返回的`Access-Control-Allow-*` 判定请求是否被允许

`CORS` 引入了以下几个以 `Access-Control-Allow-*` 开头：

*   `Access-Control-Allow-Origin` 表示允许的来源
*   `Access-Control-Allow-Methods` 表示允许的请求方法
*   `Access-Control-Allow-Headers` 表示允许的请求头
*   `Access-Control-Allow-Credentials` 表示允许携带认证信息

当请求符合响应头的这些条件时，浏览器才会发送并响应正式的请求

**4.3 nginx 反向代理**

反向代理只需要服务端 / 后端支持，几乎不涉及前端改动，只用切换接口即可

**nginx 配置跨域，可以为全局配置和单个代理配置 (两者不能同时配置)**

1.  **全局配置**，在`nginx.conf`文件中的 `http` 节点加入跨域信息

2.  **局部配置**（单个代理配置跨域）, 在路径匹配符中加入跨域信息

**4.4 Node 中间层接口转发**

**4.5 Proxy**

如果是通过`vue-cli`脚手架工具搭建项目，我们可以通过`webpack`为我们起一个本地服务器作为请求的代理对象

通过该服务器转发请求至目标服务器，得到结果再转发给前端，但是最终发布上线时如果 web 应用和接口服务器不在一起仍会跨域

在`vue.config.js`文件，新增以下代码

通过`axios`发送请求中，配置请求的根路径

此外，还可通过服务端实现代理请求转发，以`express`框架为例

**4.6 websocket**

`webSocket`本身不存在跨域问题，所以我们可以利用`webSocket`来进行非同源之间的通信

原理：利用`webSocket`的`API`，可以直接`new`一个`socket`实例，然后通过`open`方法内`send`要传输到后台的值，也可以利用`message`方法接收后台传来的数据。后台是通过`new WebSocket.Server({port:3000})`实例，利用`message`接收数据，利用`send`向客户端发送数据。具体看以下代码：

**4.7 document.domain（不常用）**

*   该方式只能用于二级域名相同的情况下，比如 `a.test.com` 和 `b.test.com` 适用于该方式。
*   只需要给页面添加 `document.domain = 'test.com'` 表示二级域名都相同就可以实现跨域
*   自 `Chrome 101` 版本开始，`document.domain` 将变为可读属性，也就是意味着上述这种跨域的方式被禁用了

**4.8 postMessage（不常用）**

在两个 `origin` 下分别部署一套页面 `A` 与 `B`，`A` 页面通过 `iframe` 加载 `B` 页面并监听消息，`B` 页面发送消息

这种方式通常用于获取嵌入页面中的第三方页面数据。一个页面发送消息，另一个页面判断来源并接收消息

**4.9 window.name（不常用）**

主要是利用 `window.name` 页面跳转不改变的特性实现跨域，即 `iframe` 加载一个跨域页面，设置 `window.name`，跳转到同域页面，可以通过 `$('iframe').contentWindow.name` 拿到跨域页面的数据

**实例说明**

比如有一个`www.example.com/a.html`页面。需要通过`a.html`页面里的`js`来获取另一个位于不同域上的页面`www.test.com/data.html`中的数据。

`data.html`页面中设置一个`window.name`即可, 代码如下

*   那么接下来问题来了，我们怎么把`data.html`页面载入进来呢，显然我们不能直接在`a.html`页面中通过改变`window.location`来载入`data.html`页面（因为我们现在需要实现的是`a.html`页面不跳转, 但是也能够获取到`data.html`中的数据）
*   具体的实现其实就是在`a.html`页面中使用一个隐藏的`iframe`来充当一个中间角色，由`iframe`去获取`data.html`的数据，然后`a.html`再去得到`iframe`获取到的数据。
*   充当中间人的`iframe`想要获取到`data.html`中通过`window.name`设置的数据，只要要把这个`iframe`的`src`设置为`www.test.com/data.html`即可, 然后`a.html`想要得到`iframe`所获取到的数据，也就是想要得到`iframe`的`widnow.name`的值，还必须把这个`iframe`的`src`设置成跟`a.html`页面同一个域才行，不然根据同源策略，`a.html`是不能访问到`iframe`中的`window.name`属性的

上面的代码只是最简单的原理演示代码，你可以对使用 js 封装上面的过程，比如动态的创建`iframe`, 动态的注册各种事件等等，当然为了安全，获取完数据后，还可以销毁作为代理的`iframe`

**4.10 扩展阅读**

**跨域与监控**

前端项目在统计前端报错监控时会遇到上报的内容只有 `Script Error` 的问题。这个问题也是由同源策略引起。在 `<script>` 标签上添加 `crossorigin="anonymous"` 并且返回的 JS 文件响应头加上 `Access-Control-Allow-Origin: *` 即可捕捉到完整的错误堆栈

**跨域与图片**

前端项目在图片处理时可能会遇到图片绘制到 `Canvas` 上之后却不能读取像素或导出 `base64` 的问题。这个问题也是由同源策略引起。解决方式和上文相同，给图片添加 `crossorigin="anonymous"` 并在返回的图片文件响应头加上 `Access-Control-Allow-Origin: *` 即可解决

### 移动端 H5 点击有 300ms 延迟，该如何解决

**解决方案**

*   禁用缩放，设置`meta`标签 `user-scalable=no`
*   现在浏览器方案 `meta`中设置`content="width=device-width"`
*   `fastclick.js`

**初期解决方案 fastClick**

**fastClick 原理**

*   监听`touchend`事件（`touchstart` `touchend`会先于`click`触发）
*   使用自定义`DOM`事件模拟一个`click`事件
*   把默认的`click`事件（`300ms`之后触发）禁止掉

**触摸事件的响应顺序**

*   `ontouchstart`
*   `ontouchmove`
*   `ontouchend`
*   `onclick`

**现代浏览器的改进**

`meta`中设置`content="width=device-width"` 就不会有`300ms`的点击延迟了。浏览器认为你要在移动端做响应式布局，所以就禁止掉了

### 如何实现网页多标签 tab 通讯

*   通过`websocket`
    *   无跨域限制
    *   需要服务端支持，成本高
*   通过`localStorage`同域通讯（推荐）
    *   `同域`的`A`和`B`两个页面
    *   `A`页面设置`localStorage`
    *   `B`页面可监听到`localStorage`值的修改
*   通过`SharedWorker`通讯
    *   `SharedWorker`是`WebWorker`的一种
    *   `WebWorker`可开启子进程执行`JS`，但不能操作`DOM`
    *   `SharedWorker`可单独开启一个进程，用于同域页面通讯
    *   `SharedWorker`兼容性不太好，调试不方便，`IE11`不支持

**localStorage 通讯例子**

**SharedWorker 通讯例子**

本地调试的时候打开 chrome 隐私模式验证，如果没有收到消息，打开`chrome://inspect/#workers` => `sharedWorkers` => 点击`inspect`

![](<./high-level.assets/1695616132976.png>)

**连环问：如何实现网页和 iframe 之间的通讯**

*   使用`postMessage`通信
*   注意跨域的限制和判断，判断域名的合法性

演示

效果

![](<./high-level.assets/1695616133277.png>)

### requestIdleCallback 和 requestAnimationFrame 有什么区别

由`react fiber`引起的关注

*   组件树转为链表，可分段渲染
*   渲染时可以暂停，去执行其他高优先级任务，空闲时在继续渲染（`JS`是单线程的，`JS`执行的时候没法去`DOM`渲染）
*   如何判断空闲？`requestIdleCallback`

**区别**

*   `requestAnimationFrame` 每次渲染完在执行，高优先级
*   `requestIdleCallback` 空闲时才执行，低优先级
*   都是宏任务，要等待 DOM 渲染完后在执行

![](<./high-level.assets/1695616134768.png>)

![](<./high-level.assets/1695616135521.png>)

### script 标签的 defer 和 async 有什么区别

*   `script`：`HTML`暂停解析，下载`JS`，执行`JS`，在继续解析`HTML`。
*   `defer`：`HTML`继续解析，并行下载`JS`，`HTML`解析完在执行`JS`（不用把`script`放到`body`后面，我们在`head`中`<script defer>`让`js`脚本并行加载会好点）
*   `async`：`HTML`继续解析，并行下载`JS`，执行`JS`（`加载完毕后立即执行`），在继续解析`HTML`
    *   加载完毕后立即执行，这导致`async`属性下的脚本是乱序的，对于 `script` 有先后依赖关系的情况，并不适用

注意：`JS`是单线程的，`JS`解析线程和`DOM`解析线程共用同一个线程，`JS执行和HTML解析是互斥的`，加载资源可以并行

![](<./high-level.assets/1695616136451.png>)

蓝色线代表网络读取，红色线代表执行时间，这俩都是针对脚本的；绿色线代表 `HTML` 解析

**连环问：prefetch 和 dns-prefetch 分别是什么**

**preload 和 prefetch**

*   `preload` 资源在当前页面使用，会优先加载
*   `prefetch` 资源在未来页面使用，空闲时加载

**dns-preftch 和 preconnect**

*   `dns-pretch` `DNS`预查询
*   `preconnect` `DNS`预连接

通过预查询和预连接减少`DNS`解析时间

## 4 Vue2

### 响应式原理

**响应式**

*   组件`data`数据一旦变化，立刻触发视图的更新
*   实现数据驱动视图的第一步
*   核心`API`：`Object.defineProperty`
    *   **缺点**
        *   深度监听，需要递归到底，一次计算量大
        *   无法监听新增属性、删除属性（使用`Vue.set`、`Vue.delete`可以）
        *   无法监听原生数组，需要重写数组原型

### vdom 和 diff 算法

**1. vdom**

*   **背景**
    *   `DOM`操作非常耗时
    *   以前用`jQuery`，可以自行控制`DOM`操作时机，手动调整
    *   `Vue`和`React`是数据驱动视图，如何有效控制`DOM`操作
*   **解决方案 VDOM**
    *   有了一定的复杂度，想减少计算次数比较难
    *   能不能把计算，更多的转移为 JS 计算？因为`JS`执行速度很快
    *   `vdom` 用`JS`模拟`DOM`结构，计算出最小的变更，操作`DOM`
*   **用 JS 模拟 DOM 结构**  
    
    ![](<./high-level.assets/1695616138519.png>)
    
*   **通过 snabbdom 学习 vdom**
    *   简洁强大的`vdom`库
    *   `vue2`参考它实现的`vdom`和`diff`
    *   **snabbdom**
        *   `h`函数
        *   `vnode`数据结构
        *   `patch`函数
*   **vdom 总结**
    *   用`JS`模拟`DOM`结构（`vnode`）
    *   新旧`vnode`对比，得出最小的更新范围，有效控制`DOM`操作
    *   数据驱动视图模式下，有效控制`DOM`操作

**2. diff 算法**

*   `diff`算法是`vdom`中最核心、最关键的部分
*   `diff`算法能在日常使用`vue` `react`中体现出来（如`key`）

**树的 diff 的时间复杂度 O(n^3)**

*   第一，遍历`tree1`
*   第二，遍历`tree2`
*   第三，排序
*   `1000`个节点，要计算`10`亿次，算法不可用

**优化时间复杂度到 O(n)**

*   只比较同一层级，不跨级比较
*   `tag`不相同，则直接删掉重建，不再深度比较
*   `tag`和`key`相同，则认为是相同节点，不再深度比较

![](<./high-level.assets/1695616139331.png>)

![](<./high-level.assets/1695616142394.png>)

**diff 过程细节**

*   新旧节点都有`children`，执行`updateChildren` `diff`对比
    
    ![](<./high-level.assets/1695616145431.png>)
    
    *   开始和开始对比 -- 头头
    *   结束和结束对比 -- 尾尾
    *   开始和结束对比 -- 头尾
    *   结束和开始对比 -- 尾头
    *   以上四个都未命中：拿新节点 `key` ，能否对应上 `oldCh` 中的某个节点的 `key`
*   新`children`有，旧`children`无：清空旧`text`节点，新增新`children`节点
*   旧`children`有，新`children`无：移除旧`children`
*   否则旧`text`有，设置`text`为空

**vdom 和 diff 算法总结**

*   细节不重要，`updateChildren`的过程也不重要，不要深究
*   `vdom`的核心概念很重要：`h`、`vnode`、`patch`、`diff`、`key`
*   `vdom`存在的价值更重要，数据驱动视图，控制`dom`操作

### 模板编译

**前置知识**

*   模板是`vue`开发中最常用的，即与使用相关联的原理
*   它不是`HTML`，有指令、插值、JS 表达式，能实现循环、判断，因此模板一定转为`JS`代码，即模板编译
*   面试不会直接问，但会通过`组件渲染和更新过程`考察

**模板编译**

*   `vue template compiler`将模板编译为`render`函数
*   执行`render`函数，生成`vnode`
*   基于`vnode`在执行`patch`和`diff`
*   使用`webpack vue-loader`插件，会在开发环境下编译模板

**with 语法**

![](<./high-level.assets/1695616147388.png>)

*   改变`{}`内自由变量的查找规则，当做`obj`属性来查找
*   如果找不到匹配的`obj`属性，就会报错
*   `with`要慎用，它打破了作用域规则，易读性变差

**vue 组件中使用 render 代替 template**

![](<./high-level.assets/1695616148110.png>)

### Vue 组件渲染过程

**前言**

*   一个组件渲染到页面，修改`data`触发更新（数据驱动视图）
*   其背后原理是什么，需要掌握哪些点
*   考察对流程了解的全面程度

**回顾三大核心知识点**

*   **响应式**：监听`data`属性`getter`、`setter`（包括数组）
*   **模板编译**：模板到`render`函数，再到`vnode`
*   **vdom**：两种用法
    *   `patch(elem,vnode)` 首次渲染`vnode`到`container`上
    *   `patch(vnode、newVnode)` 新的`vnode`去更新旧的`vnode`
*   搞定这三点核心原理，`vue`原理不是问题

**组件渲染更新过程**

*   **1. 初次渲染过程**
    *   解析模板为`render`函数（或在开发环境已经完成`vue-loader`模板编译）
    *   触发响应式，监听`data`属性`getter`、`setter`
    *   执行`render`函数（执行`render`函数过程中，会获取`data`的属性触发`getter`），生成`vnode`，在执行`patch(elem,vnode)` `elem`组件对应的`dom`节点
        *   `const template = <p>{message}</p>`
        *   编译为`render`函数 `with(this){return _c('p', [_v(_s(message))])}`
        *   `this`就是`vm`的实例, `message`等变量会从`vm`上读取，触发`getter`进行依赖收集
*   **2. 更新过程**
    *   修改`data`，触发`setter`（此前在`getter`中已被监听）
    *   重新执行`render`函数，生成`newVnode`
    *   在调用`patch(oldVnode, newVnode)`算出最小差异，进行更新
*   **3. 完成流程图**
    
    ![](<./high-level.assets/1695616150636.png>)
    

**异步渲染**

*   汇总`data`的修改，一次更新视图
*   减少`DOM`操作次数，提高性能

![](<./high-level.assets/1695616153783.png>)

**总结**

*   渲染和响应式的关系
*   渲染和模板编译的关系
*   渲染和`vdom`的关系

### Vue 组件之间通信方式有哪些

Vue 组件间通信是面试常考的知识点之一，这题有点类似于开放题，你回答出越多方法当然越加分，表明你对 Vue 掌握的越熟练。**Vue 组件间通信只要指以下 3 类通信**：`父子组件通信`、`隔代组件通信`、`兄弟组件通信`，下面我们分别介绍每种通信方式且会说明此种方法可适用于哪类组件间通信

**组件传参的各种方式**

![](<./high-level.assets/1695616154498.png>)

**组件通信常用方式有以下几种**

*   `props / $emit` **适用 父子组件通信**
    *   父组件向子组件传递数据是通过 `prop` 传递的，子组件传递数据给父组件是通过`$emit` 触发事件来做到的
*   `ref` 与 `$parent / $children(vue3废弃)` **适用 父子组件通信**
    *   `ref`：如果在普通的 `DOM` 元素上使用，引用指向的就是 `DOM` 元素；如果用在子组件上，引用就指向组件实例
    *   `$parent / $children`：访问父组件的属性或方法 / 访问子组件的属性或方法
*   `EventBus （$emit / $on）` **适用于 父子、隔代、兄弟组件通信**
    *   这种方法通过一个空的 `Vue` 实例作为中央事件总线（事件中心），用它来触发事件和监听事件，从而实现任何组件间的通信，包括父子、隔代、兄弟组件
*   `$attrs / $listeners(vue3废弃)` **适用于 隔代组件通信**
    *   `$attrs`：包含了父作用域中不被 `prop` 所识别 (且获取) 的特性绑定 ( `class` 和 `style` 除外 )。当一个组件没有声明任何 `prop` 时，这里会包含所有父作用域的绑定 ( `class` 和 `style` 除外 )，并且可以通过 `v-bind="$attrs"` 传入内部组件。通常配合 `inheritAttrs` 选项一起使用，多余的属性不会被解析到标签上
    *   `$listeners`：包含了父作用域中的 (不含 `.native` 修饰器的) `v-on` 事件监听器。它可以通过 `v-on="$listeners"` 传入内部组件
*   `provide / inject` **适用于 隔代组件通信**
    *   祖先组件中通过 `provider` 来提供变量，然后在子孙组件中通过 `inject` 来注入变量。 `provide / inject` API 主要解决了跨级组件间的通信问题，**不过它的使用场景，主要是子组件获取上级组件的状态**，跨级组件间建立了一种主动提供与依赖注入的关系
*   `$root` **适用于 隔代组件通信** 访问根组件中的属性或方法，是根组件，不是父组件。`$root`只对根组件有用
*   `Vuex` **适用于 父子、隔代、兄弟组件通信**
    *   `Vuex` 是一个专为 `Vue.js` 应用程序开发的状态管理模式。每一个 `Vuex` 应用的核心就是 `store`（仓库）。“store” 基本上就是一个容器，它包含着你的应用中大部分的状态 ( `state` )
    *   `Vuex` 的状态存储是响应式的。当 `Vue` 组件从 `store` 中读取状态的时候，若 `store` 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
    *   改变 `store` 中的状态的唯一途径就是显式地提交 (`commit`) `mutation`。这样使得我们可以方便地跟踪每一个状态的变化。

**根据组件之间关系讨论组件通信最为清晰有效**

*   父子组件：`props`/`$emit`/`$parent`/`ref`
*   兄弟组件：`$parent`/`eventbus`/`vuex`
*   跨层级关系：`eventbus`/`vuex`/`provide+inject`/`$attrs + $listeners`/`$root`

### Vue 的生命周期方法有哪些

1.  `Vue` 实例有一个完整的生命周期，也就是从`开始创建`、`初始化数据`、`编译模版`、`挂载Dom -> 渲染`、`更新 -> 渲染`、`卸载`等一系列过程，我们称这是`Vue`的生命周期
2.  `Vue`生命周期总共分为 8 个阶段`创建前/后`，`载入前/后`，`更新前/后`，`销毁前/后`

`beforeCreate` => `created` => `beforeMount` => `Mounted` => `beforeUpdate` => `updated` => `beforeDestroy` => `destroyed`。`keep-alive`下：`activated` `deactivated`

<table><thead><tr><th>生命周期 vue2</th><th>生命周期 vue3</th><th>描述</th></tr></thead><tbody><tr><td><code>beforeCreate</code></td><td><code>beforeCreate</code></td><td>在实例初始化之后，数据观测 (<code>data observer</code>) 之前被调用。</td></tr><tr><td><code>created</code></td><td><code>created</code></td><td>实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：数据观测 (<code>data observer</code>)，属性和方法的运算， <code>watch/event</code> 事件回调。这里没有<code>$el</code></td></tr><tr><td><code>beforeMount</code></td><td><code>beforeMount</code></td><td>在挂载开始之前被调用：相关的 <code>render</code> 函数首次被调用</td></tr><tr><td><code>mounted</code></td><td><code>mounted</code></td><td><code>el</code> 被新创建的 <code>vm.$el</code> 替换，并挂载到实例上去之后调用该钩子</td></tr><tr><td><code>beforeUpdate</code></td><td><code>beforeUpdate</code></td><td>组件数据更新之前调用，发生在虚拟 <code>DOM</code> 打补丁之前</td></tr><tr><td><code>updated</code></td><td><code>updated</code></td><td>由于数据更改导致的虚拟 <code>DOM</code> 重新渲染和打补丁，在这之后会调用该钩子</td></tr><tr><td><code>beforeDestroy</code></td><td><code>beforeUnmount</code></td><td>实例销毁之前调用。在这一步，实例仍然完全可用</td></tr><tr><td><code>destroyed</code></td><td><code>unmounted</code></td><td>实例销毁后调用。调用后， <code>Vue</code> 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。 该钩子在服务器端渲染期间不被调用。</td></tr></tbody></table>

其他几个生命周期

<table><thead><tr><th>生命周期 vue2</th><th>生命周期 vue3</th><th>描述</th></tr></thead><tbody><tr><td><code>activated</code></td><td><code>activated</code></td><td><code>keep-alive</code>专属，组件被激活时调用</td></tr><tr><td><code>deactivated</code></td><td><code>deactivated</code></td><td><code>keep-alive</code>专属，组件被销毁时调用</td></tr><tr><td><code>errorCaptured</code></td><td><code>errorCaptured</code></td><td>捕获一个来自子孙组件的错误时被调用</td></tr><tr><td>-</td><td><code>renderTracked</code></td><td>调试钩子，响应式依赖被收集时调用</td></tr><tr><td>-</td><td><code>renderTriggered</code></td><td>调试钩子，响应式依赖被触发时调用</td></tr><tr><td>-</td><td><code>serverPrefetch</code></td><td><code>ssr only</code>，组件实例在服务器上被渲染前调用</td></tr></tbody></table>

3.  **要掌握每个生命周期内部可以做什么事**

*   `beforeCreate` 初始化`vue`实例，进行数据观测。执行时组件实例还未创建，通常用于插件开发中执行一些初始化任务
*   `created` 组件初始化完毕，可以访问各种数据，获取接口数据等
*   `beforeMount` 此阶段`vm.el`虽已完成`DOM`初始化，但并未挂载在`el`选项上
*   `mounted` 实例已经挂载完成，可以进行一些`DOM`操作
*   `beforeUpdate` 更新前，可用于获取更新前各种状态。此时`view`层还未更新，可用于获取更新前各种状态。可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。
*   `updated` 完成`view`层的更新，更新后，所有状态已是最新。可以执行依赖于 `DOM` 的操作。然而在大多数情况下，你应该避免在此期间更改状态，因为这可能会导致更新无限循环。 该钩子在服务器端渲染期间不被调用。
*   `destroyed` 可以执行一些优化操作, 清空定时器，解除绑定事件
*   vue3 `beforeunmount`：实例被销毁前调用，可用于一些定时器或订阅的取消
*   vue3 `unmounted`：销毁一个实例。可清理它与其它实例的连接，解绑它的全部指令及事件监听器

![](<./high-level.assets/1695616155437.png>)

4.  组合式 API 生命周期钩子

你可以通过在生命周期钩子前面加上 “`on`” 来访问组件的生命周期钩子。

下表包含如何在 `setup()` 内部调用生命周期钩子：

<table><thead><tr><th>选项式 API</th><th>Hook inside setup</th></tr></thead><tbody><tr><td><code>beforeCreate</code></td><td>不需要 *</td></tr><tr><td><code>created</code></td><td>不需要 *</td></tr><tr><td><code>beforeMount</code></td><td><code>onBeforeMount</code></td></tr><tr><td><code>mounted</code></td><td><code>onMounted</code></td></tr><tr><td><code>beforeUpdate</code></td><td><code>onBeforeUpdate</code></td></tr><tr><td><code>updated</code></td><td><code>onUpdated</code></td></tr><tr><td><code>beforeUnmount</code></td><td><code>onBeforeUnmount</code></td></tr><tr><td><code>unmounted</code></td><td><code>onUnmounted</code></td></tr><tr><td><code>errorCaptured</code></td><td><code>onErrorCaptured</code></td></tr><tr><td><code>renderTracked</code></td><td><code>onRenderTracked</code></td></tr><tr><td><code>renderTriggered</code></td><td><code>onRenderTriggered</code></td></tr></tbody></table>

因为 `setup` 是围绕 `beforeCreate` 和 `created` 生命周期钩子运行的，所以不需要显式地定义它们。换句话说，在这些钩子中编写的任何代码都应该直接在 `setup` 函数中编写

**`setup`和`created`谁先执行？**

*   `beforeCreate`: 组件被创建出来，组件的`methods`和`data`还没初始化好
*   `setup`：在`beforeCreate`和`created`之间执行
*   `created`: 组件被创建出来，组件的`methods`和`data`已经初始化好了

由于在执行`setup`的时候，`created`还没有创建好，所以在`setup`函数内我们是无法使用`data`和`methods`的。所以`vue`为了让我们避免错误的使用，直接将`setup`函数内的`this`执行指向`undefined`

5.  其他问题

*   **什么是 vue 生命周期？** Vue 实例从创建到销毁的过程，就是生命周期。从开始创建、初始化数据、编译模板、挂载 Dom→渲染、更新→渲染、销毁等一系列过程，称之为 `Vue` 的生命周期。
*   **vue 生命周期的作用是什么？** 它的生命周期中有多个事件钩子，让我们在控制整个 Vue 实例的过程时更容易形成好的逻辑。
*   **vue 生命周期总共有几个阶段？** 它可以总共分为`8`个阶段：创建前 / 后、载入前 / 后、更新前 / 后、销毁前 / 销毁后。
*   **第一次页面加载会触发哪几个钩子？** 会触发下面这几个`beforeCreate`、`created`、`beforeMount`、`mounted` 。
*   **你的接口请求一般放在哪个生命周期中？** 接口请求一般放在`mounted`中，但需要注意的是服务端渲染时不支持`mounted`，需要放到`created`中
*   **DOM 渲染在哪个周期中就已经完成？** 在`mounted`中，
    *   注意 **`mounted` 不会承诺所有的子组件也都一起被挂载**。如果你希望等到整个视图都渲染完毕，可以用 `vm.$nextTick` 替换掉 `mounted`

### 如何统一监听 Vue 组件报错

*   **window.onerror**
    *   全局监听所有`JS`错误，包括异步错误
    *   但是它是`JS`级别的，识别不了`Vue`组件信息，`Vue`内部的错误还是用`Vue`来监听
    *   捕捉一些`Vue`监听不到的错误
*   **errorCaptured 生命周期**
    *   监听所有**下级组件**的错误
    *   返回`false`会阻止向上传播到`window.onerror`
*   **errorHandler 配置**
    *   `Vue`全局错误监听，所有组件错误都会汇总到这里
    *   但`errorCaptured`返回`false`，不会传播到这里
    *   `window.onerror`和`errorHandler`互斥，`window.onerror`不会在被触发，这里都是全局错误监听了
*   **异步错误**
    *   异步回调里的错误，`errorHandler`监听不到
    *   需要使用`window.onerror`
*   **总结**
    
    *   实际工作中，三者结合使用
    *   `promise`（`promise`没有被`catch`的报错，使用`onunhandledrejection`监听）和`setTimeout`异步，`vue`里面监听不了
    
    *   `errorCaptured`监听一些重要的、有风险组件的错误
    *   `window.onerror`和`errorCaptured`候补全局监听

### 在实际工作中，你对 Vue 做过哪些优化

*   **v-if 和 v-show**
    *   `v-if`彻底销毁组件
    *   `v-show`使用`dispaly`切换`block/none`
    *   实际工作中大部分情况下使用`v-if`就好，不要过渡优化
*   **v-for 使用 key**
    *   `key`不要使用`index`
*   **使用 computed 缓存**
*   **keep-alive 缓存组件**
    *   频繁切换的组件 `tabs`
    *   不要乱用，缓存会占用更多的内存
*   **异步组件**
    *   针对体积较大的组件，如编辑器、复杂表格、复杂表单
    *   拆包，需要时异步加载，不需要时不加载
    *   减少主包体积，首页会加载更快
    *   演示
*   **路由懒加载**
    *   项目比较大，拆分路由，保证首页先加载
    *   演示
*   **服务端 SSR**
    *   可使用`Nuxt.js`
    *   按需优化，使用`SSR`成本比较高
*   实际工作中你遇到积累的业务的优化经验也可以说

**连环问：你在使用 Vue 过程中遇到过哪些坑**

*   **内存泄露**
    *   全局变量、全局事件、全局定时器没有销毁
    *   自定义事件没有销毁
*   **Vue2 响应式的缺陷 (vue3 不在有)**
    *   `data`后续新增属性用`Vue.set`
    *   `data`删除属性用`Vue.delete`
    *   `Vue2`并不支持数组下标的响应式。也就是说`Vue2`检测不到通过下标更改数组的值 `arr[index] = value`
*   **路由切换时 scroll 会重新回到顶部**
    *   这是`SPA`应用的通病，不仅仅是`vue`
    *   如，列表页滚动到第二屏，点击详情页，再返回列表页，此时列表页组件会重新渲染回到了第一页
    *   **解决方案**
        *   在列表页缓存翻页过的数据和`scrollTop`的值
        *   当再次返回列表页时，渲染列表组件，执行`scrollTo(xx)`
        *   终极方案：`MPA`(多页面) + `App WebView`(可以打开多个页面不会销毁之前的)
*   日常遇到问题记录总结，下次面试就能用到

## 5 Vue3

### vue3 对 vue2 有什么优势

*   性能更好（编译优化、使用`proxy`等）
*   体积更小
*   更好的`TS`支持
*   更好的代码组织
*   更好的逻辑抽离
*   更多新功能

### vue3 和 vue2 的生命周期有什么区别

**`Options API`生命周期**

*   `beforeDestroy`改为`beforeUnmount`
*   `destroyed`改为`umounted`
*   其他沿用`vue2`生命周期

**`Composition API`生命周期**

### 如何理解 Composition API 和 Options API

**composition API 对比 Option API**

*   Composition API 带来了什么
    *   更好的代码组织
    *   更好的逻辑复用
    *   更好的类型推导
*   Composition API 和 Options API 如何选择
    *   不建议共用，会引起混乱
    *   小型项目、业务逻辑简单，用`Option API`成本更小一些
    *   中大型项目、逻辑复杂，用`Composition API`

### ref 如何使用

**ref**

*   生成值类型的响应式数据
*   可用于模板和`reactive`
*   通过`.value`修改值

### toRef 和 toRefs 如何使用和最佳方式

**toRef**

*   针对一个响应式对象（`reactive`封装的）的一个属性，创建一个`ref`，具有响应式
*   两者保持引用关系

**toRefs**

*   将响应式对象（`reactive`封装的）转化为普通对象
*   对象的每个属性都是对象的`ref`
*   两者保持引用关系

合成函数返回响应式对象

![](<./high-level.assets/1695616157032.png>)

**最佳使用方式**

*   用`reactive`做对象的响应式，用`ref`做值类型响应式（基本类型）
*   `setup`中返回`toRefs(state)`，或者`toRef(state, 'prop')`
*   `ref`的变量命名都用`xxRef`
*   合成函数返回响应式对象时，使用`toRefs`，有助于使用方对数据进行解构时，不丢失响应式

### 深入理解为什么需要 ref、toRef、toRefs

**为什么需要用 ref**

*   返回值类型，会丢失响应式
*   如在`setup`、`computed`、合成函数，都有可能返回值类型
*   `Vue`如不定义`ref`，用户将制造`ref`，反而更混乱

**为何 ref 需要. value 属性**

*   `ref`是一个对象（不丢失响应式），`value`存储值
*   通过`.value`属性的`get`和`set`实现响应式
*   用于模板、`reactive`时，不需要`.value`，其他情况都要

**为什么需要 toRef 和 toRefs**

*   **初衷**：不丢失响应式的情况下，把对象数据 `分解/扩散`
*   **前端**：针对的是响应式对象（`reactive`封装的）非普通对象
*   注意：**不创造**响应式，而是**延续**响应式

### vue3 升级了哪些重要功能

**1. createApp**

**2. emits 属性**

**3. 多事件**

**4. Fragment**

**5. 移除. sync**

**.sync 用法**

父组件把属性给子组件，子组件修改了后还能同步到父组件中来

**6. 异步组件的写法**

**7. 移除 filter**

**8. Teleport**

**9. Suspense**

**10. Composition API**

*   `reactive`
*   `ref`
*   `readonly`
*   `watch`和`watchEffect`
*   `setup`
*   生命周期钩子函数

### Composition API 如何实现逻辑复用

*   抽离逻辑代码到一个函数
*   函数命名约定为`useXx`格式（`React Hooks`也是）
*   在`setup`中引用`useXx`函数

### Vue3 如何实现响应式

*   回顾`vue2`的`Object.defineProperty`
*   缺点
    *   深度监听对象需要一次性递归
    *   无法监听新增属性、删除属性 (`Vue.set`、`Vue.delete`)
    *   无法监听原生数组，需要特殊处理
*   学习`proxy`语法
*   `Vue3`中如何使用`proxy`实现响应式

### Proxy 基本使用

### vue3 用 Proxy 实现响应式

*   深度监听，性能更好（获取到哪一层才触发响应式`get`，不是一次性递归）
*   可监听`新增/删除`属性
*   可监听数组变化

### v-model 参数的用法

### watch 和 watchEffect 的区别

*   两者都可以监听`data`属性变化
*   `watch`需要明确监听哪个属性
*   `watchEffect`会根据其中的属性，自动监听其变化

### setup 中如何获取组件实例

*   在`setup`和其他`composition API`中没有`this`
*   通过`getCurrentInstance`获取当前实例
*   若使用`options API`可以照常使用`this`

### Vue3 为何比 Vue2 快

*   `proxy`响应式：深度监听，性能更好（获取到哪一层才触发响应式`get`，不是一次性递归）
*   `PatchFlag` 动态节点做标志
*   `HoistStatic` 将静态节点的定义，提升到父作用域，缓存起来。多个相邻的静态节点，会被合并起来
*   `CacheHandler` 事件缓存
*   `SSR`优化: 静态节点不走`vdom`逻辑，直接输出字符串，动态节点才走
*   `Tree-shaking` 根据模板的内容动态`import`不同的内容，不需要就不`import`

### 什么是 PatchFlag

*   模板编译时，动态节点做标记
*   标记，分为不同类型，如`Text`、`PROPS`、`CLASS`
*   `diff`算法时，可区分静态节点，以及不同类型的动态节点

![](<./high-level.assets/1695616159272.png>)

### 什么是 HoistStatic 和 CacheHandler

**HoistStatic**

*   将静态节点的定义，提升到父作用域，缓存起来
*   多个相邻的静态节点，会被合并起来
*   典型的拿空间换时间的优化策略

**CacheHandler** 缓存事件

### SSR 和 Tree-shaking 的优化

**SSR 优化**

*   静态节点直接输出，绕过了`vdom`
*   动态节点，还是需要动态渲染

**Tree Shaking 优化**

编译时，根据不同的情况，引入不同的`API`，不会全部引用

### Vite 为什么启动非常快

*   开发环境使用`Es6 Module`，无需打包，非常快
*   生产环境使用`rollup`，并不会快很多

**ES Module 在浏览器中的应用**

### Composition API 和 React Hooks 的对比

*   前者`setup`(相当于`created`、`beforeCreate`的合集) 只会调用一次，而`React Hooks`函数在渲染过程中会被多次调用
*   `Composition API`无需使用`useMemo`、`useCallback`，因为`setup`只会调用一次，在`setup`闭包中缓存了变量
*   `Composition API`无需顾虑调用顺序，而`React Hooks`需要保证`hooks`的顺序一致（比如不能放在循环、判断里面）
*   `Composition API`的`ref`、`reactive`比`useState`难理解

## 6 React

### JSX 本质

*   `React.createElement` 即`h`函数，返回`vnode`
*   第一个参数，可能是组件，也可能是`html tag`
*   组件名，首字母必须是大写（`React`规定）

### React 合成事件机制

*   `React16`事件绑定到`document`上
*   `React17`事件绑定到`root`组件上，有利于多个`react`版本共存，例如微前端
*   `event`不是原生的，是`SyntheticEvent`合成事件对象
*   和`Vue`不同，和`DOM`事件也不同

![](<./high-level.assets/1695616161551.png>)

**合成事件图示**

![](<./high-level.assets/1695616162142.png>)

**为何需要合成事件**

*   更好的兼容性和跨平台，如`react native`
*   挂载到`document`或`root`上，减少内存消耗，避免频繁解绑
*   方便事件的统一管理（如事务机制）

### setState 和 batchUpdate 机制

*   `setState`在 react 事件、生命周期中是异步的（在`react`上下文中是异步）；在`setTimeout`、自定义`DOM`事件中是同步的
*   有时合并（对象形式`setState({})` => 通过`Object.assign`形式合并对象），有时不合并（函数形式`setState((prevState,nextState)=>{})`）

**核心要点**

1.`setState`主流程

*   `setState`是否是异步还是同步，看是否能命中`batchUpdate`机制，判断`isBatchingUpdates`
*   哪些能命中`batchUpdate`机制
    *   生命周期
    *   `react`中注册的事件和它调用的函数
    *   总之在`react`的上下文中
*   哪些不能命中`batchUpdate`机制
    *   `setTimeout`、`setInterval`等
    *   自定义`DOM`事件
    *   总之不在`react`的上下文中，`react`管不到的

![](<./high-level.assets/1695616164028.png>)

2.  `batchUpdate`机制

![](<./high-level.assets/1695616167173.png>)

![](<./high-level.assets/1695616167753.png>)

3.  `transaction`事务机制

![](<./high-level.assets/1695616169833.png>)

![](<./high-level.assets/1695616172635.png>)

![](<./high-level.assets/1695616174149.png>)

### 根据 jsx 写出 vnode 和 render 函数

**注意**

*   注意`JSX`中的常量和变量
*   注意`JSX`中的`HTML tag`和自定义组件

**在 react 中 jsx 编译后**

### 虚拟 DOM（vdom）真的很快吗

*   `virutal DOM`，虚拟`DOM`
*   用 JS 对象模拟`DOM`节点数据
*   `vdom`并不快，`JS`直接操作`DOM`才是最快的
    *   以`vue`为例，`data`变化 => `vnode diff` => 更新`DOM` 肯定是比不过直接操作`DOM`节点快的
*   但是 "数据驱动视图" 要有合适的技术方案，不能全部`DOM`重建
*   `dom`就是目前最合适的技术方案（并不是因为它快，而是合适）
*   在大型系统中，全部更新`DOM`的成本太高，使用`vdom`把更新范围减少到最小

并不是所有的框架都在用`vdom`，`svelte`就不用`vdom`

![](<./high-level.assets/1695616174937.png>)

### react 组件渲染过程

*   `JSX`如何渲染为页面
*   `setState`之后如何更新页面
*   面试考察全流程

**1. 组件渲染过程**

*   分析
    *   `props`、`state` 变化
    *   `render()`生成`vnode`
    *   `patch(elem, vnode)` 渲染到页面上（`react`并一定用`patch`）
*   渲染过程
    *   `setState(newState)` => `newState`存入`pending`队列，判断是否处于`batchUpdate`状态，保存组件于`dirtyComponents`中（可能有子组件）
        
        ![](<./high-level.assets/1695616178423.png>)
        
    *   遍历所有的`dirtyComponents`调用`updateComponent`生成`newVnode`
    *   `patch(vnode,newVnode)`

**2. 组件更新过程**

*   `patch`更新被分为两个阶段
    *   **reconciliation 阶段**：执行`diff`算法，纯`JS`计算
    *   **commit 阶段**：将`diff`结果渲染到`DOM`中
*   如果不拆分，可能有性能问题
    *   `JS`是单线程的，且和`DOM`渲染共用一个线程
    *   当组件足够复杂，组件更新时计算和渲染都压力大
    *   同时再有`DOM`操作需求（动画、鼠标拖拽等）将卡顿
*   **解决方案 Fiber**
    *   `reconciliation`阶段拆分为多个子任务
    *   `DOM`需要渲染时更新，空闲时恢复在执行计算
    *   通过`window.requestIdleCallback`来判断浏览器是否空闲

### React setState 经典面试题

*   **关于 setState 的两个考点**
    *   同步或异步
    *   `state`合并或不合并
        *   `setState`传入函数不会合并覆盖
        *   `setState`传入对象会合并覆盖`Object.assigin({})`
*   分析
    *   **默认情况**
        *   `state`默认异步更新
        *   `state`默认合并后更新（后面的覆盖前面的，多次重复执行不会累加）
    *   `setState`在合成事件和生命周期钩子中，是异步更新的
    *   **react 同步更新，不在 react 上下文中触发**
        *   在`原生事件`、`setTimeout`、`setInterval`、`promise.then`、`Ajax`回调中，`setState`是同步的，可以马上获取更新后的值
            *   原生事件如`document.getElementById('test').addEventListener('click',()=>{this.setState({count:this.state.count + 1}})`
        *   原因: 原生事件是浏览器本身的实现，与事务流无关，自然是同步；而`setTimeout`是放置于定时器线程中延后执行，此时事务流已结束，因此也是同步
    *   **注意：在 react18 中不一样**
        *   上述场景，在`react18`中可以异步更新（`Auto Batch`）
        *   需将`ReactDOM.render`替换为`ReactDOM.createRoot`

如需要实时获取结果，在回调函数中获取 `setState({count:this.state.count + 1},()=>console.log(this.state.count)})`

在`React 18`之前，`setState`在`React`的合成事件中是合并更新的，在`setTimeout`的原生事件中是同步按序更新的。例如

而在`React 18`中，不论是在合成事件中，还是在宏任务中，都是会合并更新

**连环问：setState 是宏任务还是微任务**

*   **setState 本质是同步的**
    *   `setState`是同步的，不过让`react`做成异步更新的样子而已
        *   如果`setState`是微任务，就不应该在`promise.then`微任务之前打印出来（`promise then`微任务先注册）
    *   因为要考虑性能，多次`state`修改，只进行一次`DOM`渲染
    *   日常所说的 “异步” 是不严谨的，但沟通成本低
*   **总结**
    *   `setState`是同步执行，`state`都是同步更新（只是我们日常把`setState`当异步来处理）
    *   在微任务`promise.then`之前，`state`已经计算完了
    *   同步，不是微任务或宏任务

### React useEffect 闭包陷阱问题

问：按钮点击三次后，定时器输出什么？

答案一直是`0` `useEffect`闭包陷阱问题，`useEffect`依赖是空的，只会执行一次。`setInterval`中的`value`就只会获取它之前的变量。而`react`有个特点，每次`value`变化都会重新执行`useEffectDemo`这个函数。点击了三次函数会执行三次，三次过程中每个函数中`value`都不一样，`setInterval`获取的永远是第一个函数里面的`0`

### Vue React diff 算法有什么区别

**diff 算法**

*   `Vue React diff` 不是对比文字，而是 `vdom` 树，即 `tree diff`
*   传统的 `tree diff` 算法复杂度是 `O(n^3)` ，算法不可用。

![](<./high-level.assets/1695616179663.png>)

**优化**

`Vue React` 都是用于网页开发，基于 `DOM` 结构，对 `diff` 算法都进行了优化（或者简化）

*   只在同一层级比较，不跨层级（`DOM` 结构的变化，很少有跨层级移动）
*   `tag` 不同则直接删掉重建，不去对比内部细节（`DOM` 结构变化，很少有只改外层，不改内层）
*   同一个节点下的子节点，通过 `key` 区分

最终把时间复杂度降低到 `O(n)` ，生产环境下可用。这一点 `Vue React` 都是相同的。

![](<./high-level.assets/1695616181332.png>)

**React diff 特点 - 仅向右移动**

比较子节点时，仅向右移动，不向左移动。

![](<./high-level.assets/1695616182314.png>)

**Vue2 diff 特点 - 双端比较**

![](<./high-level.assets/1695616183701.png>)

定义四个指针，分别比较

*   `oldStartNode` 和 `newStartNode` 头头
*   `oldStartNode` 和 `newEndNode` 头尾
*   `oldEndNode` 和 `newStartNode` 尾头
*   `oldEndNode` 和 `newEndNode` 尾尾

然后指针继续向中间移动，直到指针汇合

**Vue3 diff 特点 - 最长递增子序列**

例如数组 `[3，5，7，1，2，8]` 的最长递增子序列就是 `[3，5，7，8 ]` 。这是一个专门的算法。

![](<./high-level.assets/1695616184733.png>)

**算法步骤**

*   通过 “前 - 前” 比较找到开始的不变节点 `[A, B]`
*   通过 “后 - 后” 比较找到末尾的不变节点 `[G]`
*   剩余的有变化的节点 `[F, C, D, E, H]`
    *   通过 `newIndexToOldIndexMap` 拿到 `oldChildren` 中对应的 `index` `[5, 2, 3, 4, -1]` （`-1` 表示之前没有，要新增）
    *   计算**最长递增子序列**得到 `[2, 3, 4]` ，对应的就是 `[C, D, E]` ，即这些节点可以不变
    *   剩余的节点，根据 `index` 进行新增、删除

该方法旨在尽量减少 `DOM` 的移动，`达到最少的DOM操作`。

**总结**

*   `React diff` 特点 - 仅向右移动
*   `Vue2 diff` 特点 - `updateChildren`双端比较
*   `Vue3 diff` 特点 - `updateChildren`增加了最长递增子序列，更快
    *   `Vue3`增加了`patchFlag`、静态提升、函数缓存等

**连环问：diff 算法中 key 为何如此重要**

无论在 `Vue` 还是 React 中，`key` 的作用都非常大。以 `React` 为例，是否使用 `key` 对内部 `DOM` 变化影响非常大。

![](<./high-level.assets/1695616185882.png>)

### 如何统一监听 React 组件报错

*   **ErrorBoundary 组件**
    *   在`react16`版本之后，增加了`ErrorBoundary`组件
    *   监听所有`下级组件`报错，可降级展示`UI`
    *   只监听组件渲染时报错，不监听`DOM`事件错误、异步错误
        *   `ErrorBoundary`没有办法监听到点击按钮时候的在`click`的时候报错
        *   只能监听组件从一开始渲染到渲染成功这段时间报错，渲染成功后在怎么操作产生的错误就不管了
        *   可用`try catch`或者`window.onerror`（二选一）
    *   只在`production`环境生效 (需要打包之后查看效果)，`dev`会直接抛出错误
*   **总结**
    *   `ErrorBoundary`监听组件渲染报错
    *   事件报错使用`try catch`或`window.onerror`
    *   异步报错使用`window.onerror`

### 在实际工作中，你对 React 做过哪些优化

*   **修改 CSS 模拟 v-show**
*   **循环使用 key**
    *   `key`不要用`index`
*   **使用 Flagment 或 <></> 空标签包裹减少多个层级组件的嵌套**
*   **jsx 中不要定义函数**：`JSX`会被频繁执行的
*   **使用 shouldComponentUpdate**
    *   判断组件是否需要更新
    *   或者使用`React.PureComponent`比较`props`第一层属性
    *   函数组件使用`React.memo(comp, fn)`包裹 `function fn(prevProps,nextProps) {// 自己实现对比，像shouldComponentUpdate}`
*   **Hooks 缓存数据和函数**
    *   `useCallback`: 缓存回调函数，避免传入的回调每次都是新的函数实例而导致依赖组件重新渲染，具有性能优化的效果
    *   `useMemo`: 用于缓存传入的 `props`，避免依赖的组件每次都重新渲染
*   **使用异步组件**
*   **路由懒加载**
*   **使用 SSR**：`Next.js`

**连环问：你在使用 React 时遇到过哪些坑**

*   **自定义组件的名称首字母要大写**
    
*   **JS 关键字的冲突**
    
*   **JSX 数据类型**
    
*   **setState 不会马上获取最新的结果**
    
    *   如需要实时获取结果，在回调函数中获取 `setState({count:this.state.count + 1},()=>console.log(this.state.count)})`
    *   `setState`在合成事件和生命周期钩子中，是异步更新的
    *   在**原生事件**和`setTimeout`中，`setState`是同步的，可以马上获取更新后的值；
    *   原因: 原生事件是浏览器本身的实现，与事务流无关，自然是同步；而`setTimeout`是放置于定时器线程中延后执行，此时事务流已结束，因此也是同步；

### React 真题

**1. 函数组件和 class 组件区别**

*   纯函数，输入`props`，输出`JSX`
*   没有实例、没有生命周期、没有`state`
*   不能拓展其他方法

**2. 什么是受控组件**

*   表单的值，受到`state`控制
*   需要自行监听`onChange`，更新`state`
*   对比非受控组件

**3. 何时使用异步组件**

*   加载大组件
*   路由懒加载

**4. 多个组件有公共逻辑如何抽离**

*   `HOC`高阶组件
*   `Render Props`
*   `React Hooks`

**5. react router 如何配置懒加载**

![](<./high-level.assets/1695616186458.png>)

### React 和 Vue 的区别（常考）

**共同**

*   都支持组件化
*   都是数据驱动视图
*   都用`vdom`操作`DOM`

**区别**

*   `React`使用`JSX`拥抱`JS`，`Vue`使用模板拥抱`HTML`
*   `React`函数式编程，`Vue`是声明式编程
*   `React`更多的是自力更生，`Vue`把你想要的都给你

**当比较 React 和 Vue 时，以下是一些详细的区别：**

1.  构建方式：

*   React：React 是一个用于构建用户界面的 JavaScript 库。它使用 JSX 语法，将组件的结构和逻辑放在一起，通过组件的嵌套和组合来构建应用程序。
*   Vue：Vue 是一个渐进式框架，可以用于构建整个应用程序或仅用于特定页面的一部分。它使用模板语法，将 HTML 模板和 JavaScript 代码分离，通过指令和组件来构建应用程序。

2.  学习曲线：

*   React：React 相对来说更加灵活和底层，需要对 JavaScript 和 JSX 有一定的了解。它提供了更多的自由度和灵活性，但也需要更多的学习和理解。
*   Vue：Vue 则更加简单和易于上手，它使用了模板语法和一些特定的概念，使得学习和使用起来更加直观。Vue 的文档和教程也非常友好和详细。

3.  数据绑定：

*   React：React 使用单向数据流，通过 props 将数据从父组件传递到子组件。如果需要在子组件中修改数据，需要通过回调函数来实现。
*   Vue：Vue 支持双向数据绑定，可以通过 v-model 指令实现数据的双向绑定。这使得在 Vue 中处理表单和用户输入更加方便。

4.  组件化开发：

*   React：React 的组件化开发非常灵活，组件可以通过 props 接收数据，通过 state 管理内部状态。React 还提供了生命周期方法，可以在组件的不同阶段执行特定的操作。
*   Vue：Vue 的组件化开发也非常强大，组件可以通过 props 接收数据，通过 data 属性管理内部状态。Vue 还提供了生命周期钩子函数，可以在组件的不同阶段执行特定的操作。

5.  生态系统：

*   React：React 拥有庞大的生态系统，有许多第三方库和工具可供选择。React 还有一个强大的社区支持，提供了大量的教程、文档和示例代码。
*   Vue：Vue 的生态系统也很活跃，虽然相对 React 来说规模较小，但也有许多第三方库和工具可供选择。Vue 的文档和教程也非常友好和详细。

6.  性能：

*   React：React 通过虚拟 DOM（Virtual DOM）和高效的 diff 算法来提高性能。它只更新需要更新的部分，减少了对实际 DOM 的操作次数。
*   Vue：Vue 也使用虚拟 DOM 来提高性能，但它采用了更细粒度的观察机制，可以精确追踪数据的变化，从而减少不必要的更新操作。

## 7 React Hooks

### class 组件存在哪些问题

*   **函数组件的特点**
    *   没有组件实例
    *   没有生命周期
    *   没有`state`和`setState`，只能接收`props`
*   **class 组件问题**
    *   大型组件很难拆分和重构，很难测试
    *   相同的业务逻辑分散到各个方法中，逻辑混乱
    *   复用逻辑变得复杂，如`Mixins`、`HOC`、`Render Props`
*   **react 组件更易用函数表达**
    *   React 提倡函数式编程，`View = fn(props)`
    *   函数更灵活，更易于拆分，更易测试
    *   但函数组件太简单，需要增强能力—— 使用`hooks`

### 用 useState 实现 state 和 setState 功能

**让函数组件实现 state 和 setState**

*   默认函数组件没有`state`
*   函数组件是一个纯函数，执行完即销毁，无法存储`state`
*   需要`state hook`，即把`state`“钩” 到纯函数中（保存到闭包中）

**hooks 命名规范**

*   规定所有的`hooks`都要以`use`开头，如`useXX`
*   自定义`hook`也要以`use`开头

### 用 useEffect 模拟组件生命周期

**让函数组件模拟生命周期**

*   默认函数组件没有生命周期
*   函数组件是一个纯函数，执行完即销毁，自己无法实现生命周期
*   使用`Effect Hook`把生命周期 "钩" 到纯函数中

**useEffect 让纯函数有了副作用**

*   默认情况下，执行纯函数，输入参数，返回结果，无副作用
*   所谓副作用，就是对函数之外造成影响，如设置全局定时器
*   而组件需要副作用，所以需要有`useEffect`钩到纯函数中

**总结**

*   模拟`componentDidMount`，`useEffect`依赖`[]`
*   模拟`componentDidUpdate`，`useEffect`依赖`[a,b]`或者`useEffect(fn)`没有写第二个参数
*   模拟`componentWillUnmount`，`useEffect`返回一个函数
*   注意`useEffect(fn)`没有写第二个参数：同时模拟`componentDidMount` + `componentDidUpdate`

### 用 useEffect 模拟 WillUnMount 时的注意事项

**useEffect 中返回函数**

*   `useEffect`依赖项`[]`，组件销毁时执行`fn`，等于`willUnmount`
*   `useEffect`第二个参数没有或依赖项`[a,b]`，组件更新时执行`fn`，即下次执行`useEffect`之前，就会执行`fn`，无论更新或卸载（`props`更新会导致`willUnmount`多次执行）

### useRef 和 useContext

**1. useRef**

**2. useContext**

### useReducer 能代替 redux 吗

*   `useReducer`是`useState`的代替方案，用于`state`复杂变化
*   `useReducer`是单个组件状态管理，组件通讯还需要`props`
*   `redux`是全局的状态管理，多组件共享数据

### 使用 useMemo 做性能优化

*   状态变化，React 会默认更新所有子组件
*   `class`组件使用`shouldComponentUpdate`和`PureComponent`优化
*   `Hooks`中使用`useMemo`缓存对象，避免子组件更新
*   `useMemo`需要配合`React.memo`使用才生效

### 使用 useCallback 做性能优化

*   `Hooks`中使用`useCallback`缓存函数，避免子组件更新
*   `useCallback`需要配合`React.memo`使用才生效

### 什么是自定义 Hook

*   封装通用的功能
*   开发和使用第三方`Hooks`
*   自定义`Hooks`带来无限的拓展性，解耦代码

### 使用 Hooks 的两条重要规则

*   只能用于函数组件和自定义`Hook`中，其他地方不可以
*   只能用于顶层代码，不能在判断、循环中使用`Hooks`
*   `eslint`插件`eslint-plugin-react-hooks`可以帮助检查`Hooks`的使用规则

![](<./high-level.assets/1695616189460.png>)

### 为何 Hooks 要依赖于调用顺序

*   无论是`render`还是`re-render`，`Hooks`调用顺序必须一致
*   如果`Hooks`出现在循环、判断里，则无法保证顺序一致
*   `Hooks`严重依赖调用顺序

### class 组件逻辑复用有哪些问题

*   **高级组件 HOC**
    *   组件嵌套层级过多，不易于渲染、调试
    *   `HOC`会劫持`props`，必须严格规范
*   **Render Props**
    *   学习成本高，不利于理解
    *   只能传递纯函数，而默认情况下纯函数功能有限

### Hooks 组件逻辑复用有哪些好处

*   变量作用域很明确
*   不会产生组件嵌套

### Hooks 使用中的几个注意事项

*   `useState`初始化值，只有第一次有效
*   `useEffect`内部不能修改`state`，第二个参数需要是空的依赖`[]`
*   `useEffect`可能出现死循环，依赖`[]`里面有对象、数组等引用类型，把引用类型拆解为值类型

## 8 Webpack

### hash、chunkhash、contenthash 区别

*   如果是`hash`的话，是和整个项目有关的，有一处文件发生更改则所有文件的`hash`值都会发生改变且它们共用一个`hash`值；
*   如果是`chunkhash`的话，只和`entry`的每个入口文件有关，也就是同一个`chunk`下的文件有所改动该`chunk`下的文件的`hash`值就会发生改变
*   如果是`contenthash`的话，和每个生成的文件有关，只有当要构建的文件内容发生改变时才会给该文件生成新的`hash`值，并不会影响其它文件。

### webpack 常用插件总结

**1. 功能类**

**1.1 html-webpack-plugin**

自动生成`html`，基本用法：

**1.2 copy-webpack-plugin**

拷贝资源插件

**1.3 webpack-manifest-plugin && assets-webpack-plugin**

俩个插件效果一致，都是生成编译结果的资源单，只是资源单的数据结构不一致而已

**webpack-manifest-plugin 基本用法**

**assets-webpack-plugin 基本用法**

**1.4 clean-webpack-plugin**

在编译之前清理指定目录指定内容

**1.5 compression-webpack-plugin**

提供带 `Content-Encoding` 编码的压缩版的资源

**1.6 progress-bar-webpack-plugin**

编译进度条插件

**2. 代码相关类**

**2.1 webpack.ProvidePlugin**

自动加载模块，如 `$` 出现，就会自动加载模块；`$` 默认为`'jquery'`的`exports`

**2.2 webpack.DefinePlugin**

定义全局常量

**2.3 mini-css-extract-plugin && extract-text-webpack-plugin**

提取 css 样式，对比

*   `mini-css-extract-plugin` 为`webpack4`及以上提供的`plugin`，支持`css chunk`
*   `extract-text-webpack-plugin` 只能在`webpack3` 及一下的版本使用，不支持`css chunk`

**基本用法 extract-text-webpack-plugin**

**基本用法 mini-css-extract-plugin**

**3. 编译结果优化类**

**3.1 wbepack.IgnorePlugin**

忽略`regExp`匹配的模块

**3.2 uglifyjs-webpack-plugin**

代码丑化，用于 js 压缩

**3.3 optimize-css-assets-webpack-plugin**

css 压缩，主要使用 `cssnano` 压缩器 https://github.com/cssnano/cssnano

**3.4 webpack-md5-hash**

使你的`chunk`根据内容生成`md5`，用这个`md5`取代 `webpack chunkhash`。

**3.5 SplitChunksPlugin**

*   `CommonChunkPlugin` 的后世，用于`chunk`切割。

`webpack` 把 `chunk` 分为两种类型，一种是初始加载`initial chunk`，另外一种是异步加载 `async chunk`，如果不配置`SplitChunksPlugin`，`webpack`会在`production`的模式下自动开启，默认情况下，`webpack`会将 `node_modules` 下的所有模块定义为异步加载模块，并分析你的 `entry`、动态加载（`import()`、`require.ensure`）模块，找出这些模块之间共用的`node_modules`下的模块，并将这些模块提取到单独的`chunk`中，在需要的时候异步加载到页面当中，其中默认配置如下

**4. 编译优化类**

**4.1 DllPlugin && DllReferencePlugin && autodll-webpack-plugin**

*   `dllPlugin`将模块预先编译，`DllReferencePlugin` 将预先编译好的模块关联到当前编译中，当 `webpack` 解析到这些模块时，会直接使用预先编译好的模块。
*   `autodll-webpack-plugin` 相当于 `dllPlugin` 和 `DllReferencePlugin` 的简化版，其实本质也是使用 `dllPlugin && DllReferencePlugin`，它会在第一次编译的时候将配置好的需要预先编译的模块编译在缓存中，第二次编译的时候，解析到这些模块就直接使用缓存，而不是去编译这些模块

**dllPlugin 基本用法：**

**DllReferencePlugin 基本用法：**

**autodll-webpack-plugin 基本用法：**

**4.2 happypack && thread-loader**

多线程编译，加快编译速度，`thread-loader`不可以和 `mini-css-extract-plugin` 结合使用

**happypack 基本用法**

**thread-loader 基本用法**

**4.3 hard-source-webpack-plugin && cache-loader**

使用模块编译缓存，加快编译速度

**hard-source-webpack-plugin 基本用法**

**cache-loader 基本用法**

**5. 编译分析类**

**5.1 webpack-bundle-analyzer**

编译模块分析插件

**5.2 stats-webpack-plugin && PrefetchPlugin**

`stats-webpack-plugin` 将构建的统计信息写入文件，该文件可在 http://webpack.github.io/analyse 中上传进行编译分析，并根据分析结果，可使用 `PrefetchPlugin` 对部分模块进行预解析编译

**stats-webpack-plugin 基本用法：**

**PrefetchPlugin 基本用法：**

**5.3 speed-measure-webpack-plugin**

统计编译过程中，各`loader`和`plugin`使用的时间

### webpack 热更新原理

![](<./high-level.assets/1695616190203.png>)

*   当修改了一个或多个文件；
*   文件系统接收更改并通知 `webpack`；
*   `webpack` 重新编译构建一个或多个模块，并通知 `HMR` 服务器进行更新；
*   `HMR Server` 使用 `webSocket` 通知 `HMR runtime` 需要更新，`HMR` 运行时通过 `HTTP` 请求更新 `jsonp`
*   `HMR` 运行时替换更新中的模块，如果确定这些模块无法更新，则触发整个页面刷新

### webpack 原理简述

**1.1 核心概念**

JavaScript 的 模块打包工具 (module bundler)。通过分析模块之间的依赖，最终将所有模块打包成一份或者多份代码包 (bundler)，供 HTML 直接引用。实质上，Webpack 仅仅提供了 打包功能 和一套 文件处理机制，然后通过生态中的各种 Loader 和 Plugin 对代码进行预编译和打包。因此 Webpack 具有高度的可拓展性，能更好的发挥社区生态的力量。

*   **Entry**: 入口文件，`Webpack`会从该文件开始进行分析与编译；
*   **Output**: 出口路径，打包后创建 `bundler`的文件路径以及文件名；
*   **Module**: 模块，在 `Webpack` 中任何文件都可以作为一个模块，会根据配置的不同的 `Loader` 进行加载和打包；
*   **Chunk**: 代码块，可以根据配置，将所有模块代码合并成一个或多个代码块，以便按需加载，提高性能；
*   **Loader**: 模块加载器，进行各种文件类型的加载与转换；
*   **Plugin**: 拓展插件，可以通过 `Webpack` 相应的事件钩子，介入到打包过程中的任意环节，从而对代码按需修改；

**1.2 工作流程 (加载 - 编译 - 输出)**

1.  读取配置文件，按命令 初始化 配置参数，创建 `Compiler` 对象；
2.  调用插件的 `apply` 方法 挂载插件 监听，然后从入口文件开始执行编译；
3.  按文件类型，调用相应的 `Loader` 对模块进行 编译，并在合适的时机点触发对应的事件，调用 `Plugin` 执行，最后再根据模块 依赖查找 到所依赖的模块，递归执行第三步；
4.  将编译后的所有代码包装成一个个代码块 (`Chunk`)， 并按依赖和配置确定 输出内容。这个步骤，仍然可以通过 `Plugin` 进行文件的修改;
5.  最后，根据 `Output` 把文件内容一一写入到指定的文件夹中，完成整个过程；

**1.3 模块包装**

**总结:**

*   **模块机制**: `webpack`自己实现了一套模拟模块的机制，将其包裹于业务代码的外部，从而提供了一套模块机制；
*   **文件编译**: `webpack`规定了一套编译规则，通过 `Loader` 和 `Plugin`，以管道的形式对文件字符串进行处理；

**1.4 webpack 的打包原理**

*   `初始化参数`：从配置文件和 `Shell` 语句中读取与合并参数，得出最终的参数
*   `开始编译`：用上一步得到的参数初始化 `Compiler` 对象，加载所有配置的插件，执行对象的 `run` 方法开始执行编译
*   `确定入口`：根据配置中的 `entry` 找出所有的入口文件
*   `编译模块`：从入口文件出发，调用所有配置的 `Loader` 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理
*   `完成模块编译`：在经过第`4`步使用 `Loader` 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系
*   `输出资源`：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 `Chunk`，再把每个 `Chunk` 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会
*   `输出完成`：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统

**1.5 webpack 的打包原理详细**

**相关问题**

*   `webpack` 工作流程是怎样的
*   `webpack` 在不同阶段做了什么事情

webpack 是一种模块打包工具，可以将各类型的资源，例如图片、CSS、JS 等，转译组合为 JS 格式的 `bundle` 文件

**webpack 构建的核心任务是完成内容转化和资源合并。主要包含以下 3 个阶段：**

1.  初始化阶段

*   **初始化参数**：从配置文件、配置对象和 Shell 参数中读取并与默认参数进行合并，组合成最终使用的参数
*   **创建编译对象**：用上一步得到的参数创建 `Compiler` 对象。
*   **初始化编译环境**：包括注入内置插件、注册各种模块工厂、初始化 `RuleSet` 集合、加载配置的插件等

2.  构建阶段

*   **开始编译**：执行 `Compiler` 对象的 `run` 方法，创建 `Compilation` 对象。
*   **确认编译入口**：进入 `entryOption` 阶段，读取配置的 `Entries`，递归遍历所有的入口文件，调用 `Compilation.addEntry` 将入口文件转换为 Dependency 对象。
*   **编译模块（make）**： 调用 `normalModule` 中的 `build` 开启构建，从 `entry` 文件开始，调用 `loader` 对模块进行转译处理，然后调用 JS 解释器（`acorn`）将内容转化为 `AST` 对象，然后递归分析依赖，依次处理全部文件。
*   **完成模块编译**：在上一步处理好所有模块后，得到模块编译产物和依赖关系图

3.  生成阶段

*   **输出资源（seal）**：根据入口和模块之间的依赖关系，组装成多个包含多个模块的 `Chunk`，再把每个 `Chunk` 转换成一个 `Asset` 加入到输出列表，这步是可以修改输出内容的最后机会。
*   **写入文件系统（emitAssets）**：确定好输出内容后，根据配置的 `output` 将内容写入文件系统

**知识点深入**

**1. webpack 初始化过程**

从 webpack 项目 `webpack.config.js` 文件 webpack 方法出发，可以看到初始化过程如下：

![](<./high-level.assets/1695616193060.png>)

*   将命令行参数和用户的配置文件进行合并
*   调用 `getValidateSchema` 对配置进行校验
*   调用 `createCompiler` 创建 `Compiler` 对象
    *   将用户配置和默认配置进行合并处理
    *   实例化 `Compiler`
    *   实例化 `NodeEnvironmentPlugin`
    *   处理用户配置的 `plugins`，执行 `plugin` 的 `apply` 方法。
    *   触发 `environment` 和 `afterEnvironment` 上注册的事件。
    *   注册 `webpack` 内部插件。
    *   触发 `initialize` 事件

**2. webpack 构建阶段做了什么**

在 webpack 函数执行完之后，就到主要的构建阶段，首先执行 `compiler.run()`，然后触发一系列钩子函数，执行 `compiler.compile()`

![](<./high-level.assets/1695616193633.png>)

*   在实例化 `compiler` 之后，执行 `compiler.run()`
*   执行 `newCompilation` 函数，调用 `createCompilation` 初始化 `Compilation` 对象
*   执行 `_addEntryItem` 将入口文件存入 `this.entries`（`map` 对象），遍历 `this.entries` 对象构建 `chunk`。
*   执行 `handleModuleCreation`，开始创建模块实例。
*   执行 `moduleFactory.create` 创建模块
    *   执行 `factory.hooks.factorize.call` 钩子，然后会调用 `ExternalModuleFactoryPlugin` 中注册的钩子，用于配置外部文件的模块加载方式
    *   使用 `enhanced-resolve` 解析模块和 `loader` 的真实绝对路径
    *   执行 `new NormalModule()` 创建 `module` 实例
*   执行 `addModule`，存储 `module`
*   执行 `buildModule`，添加模块到模块队列 `buildQueue`，开始构建模块, 这里会调用 `normalModule` 中的 `build` 开启构建
    *   创建 `loader` 上下文。
    *   执行 `runLoaders`，通过 `enhanced-resolve` 解析得到的模块和 `loader` 的路径获取函数，执行 `loader`。
    *   生成模块的 `hash`
*   所有依赖都解析完毕后，构建阶段结束

**3. webpack 生成阶段做了什么**

构建阶段围绕 `module` 展开，生成阶段则围绕 `chunks` 展开。经过构建阶段之后，webpack 得到足够的模块内容与模块关系信息，之后通过 `Compilation.seal` 函数生成最终资源

**3.1 生成产物**

执行 `Compilation.seal` 进行产物的封装

*   构建本次编译的 `ChunkGraph` 对象，执行 `buildChunkGraph`，这里会将 `import()`、`require.ensure` 等方法生成的动态模块添加到 `chunks` 中
*   遍历 `Compilation.modules` 集合，将 `module` 按 **`entry`/ 动态引入** 的规则分配给不同的 `Chunk` 对象。
*   调用 `Compilation.emitAssets` 方法将 `assets` 信息记录到 `Compilation.assets` 对象中。
*   执行 `hooks.optimizeChunkModules` 的钩子，这里开始进行代码生成和封装。
    *   执行一系列钩子函数（`reviveModules`, `moduleId`, `optimizeChunkIds` 等）
    *   执行 `createModuleHashes` 更新模块 `hash`
    *   执行 `JavascriptGenerator` 生成模块代码，这里会遍历 `modules`，创建构建任务，循环使用 `JavascriptGenerator` 构建代码，这时会将 `import` 等模块引入方式替换为 `webpack_require` 等，并将生成结果存入缓存
    *   执行 `processRuntimeRequirements`，根据生成的内容所使用到的 `webpack_require` 的函数，添加对应的代码
    *   执行 `createHash` 创建 `chunk` 的 `hash`
    *   执行 `clearAssets` 清除 `chunk` 的 `files` 和 `auxiliary`，这里缓存的是生成的 `chunk` 的文件名，主要是清除上次构建产生的废弃内容

**3.2 文件输出**

回到 `Compiler` 的流程中，执行 `onCompiled` 回调。

*   触发 `shouldEmit` 钩子函数，这里是最后能优化产物的钩子。
*   遍历 `module` 集合，根据 `entry` 配置及引入资源的方式，将 `module` 分配到不同的 `chunk`。
*   遍历 `chunk` 集合，调用 `Compilation.emitAsset` 方法标记 `chunk` 的输出规则，即转化为 `assets` 集合。
*   写入本地文件，用的是 webpack 函数执行时初始化的文件流工具。
*   执行 `done` 钩子函数，这里会执行 `compiler.run()` 的回调，再执行 `compiler.close()`，然后执行持久化存储（前提是使用的 `filesystem` 缓存模式）

**1.6 总结**

1.  **初始化参数**：从配置文件和 `Shell` 语句中读取并合并参数，得出最终的配置参数。
2.  **开始编译**：从上一步得到的参数初始化 `Compiler` 对象，加载所有配置的插件，执行对象的 `run` 方法开始执行编译。
3.  **确定入口**：根 scope 据配置中的 `entry` 找出所有的入口文件。
4.  **编译模块**：从入口文件出发，调用所有配置的 `loader` 对模块进行翻译，再找出该模块依赖的模块，这个步骤是递归执行的，直至所有入口依赖的模块文件都经过本步骤的处理。
5.  **完成模块编译**：经过第 `4` 步使用 `loader` 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系。
6.  **输出资源**：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 `chunk`，再把每个 `chunk` 转换成一个单独的文件加入到输出列表，这一步是可以修改输出内容的最后机会。
7.  **输出完成**：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。

### webpack 性能优化 - 构建速度

先分析遇到哪些问题，在配合下面的方法优化，不要上来就回答，让人觉得背面试题

*   优化`babel-loader`缓存
    
    ![](<./high-level.assets/1695616196161.png>)
    
*   `IgnorePlugin` 忽略某些包，避免引入无用模块（直接不引入，需要在代码中引入）
    *   `import moment from 'moment'`
    *   默认会引入所有语言 JS 代码，代码过大
*   `noParse` 避免重复打包（引入但不打包）
    
    ![](<./high-level.assets/1695616197764.png>)
    
*   `happyPack`多线程打包
    *   JS 单线程的，开启多进程打包
    *   提高构建速度 (特别是多核`CPU`)
*   `parallelUglifyPlugin`多进程压缩`JS`
    *   **关于多进程**
        *   项目较大，打包较慢，开启多进程能提高速度
        *   项目较小，打包很快，开启多进程反而会降低速度（进程开销）
        *   按需使用
*   自动刷新（开发环境）使用`dev-server`即可
    
    ![](<./high-level.assets/1695616198321.png>)
    
*   热更新（开发环境）
    *   自动刷新：整个网页全部刷新，速度较慢，状态会丢失
        
    *   热更新：新代码生效，网页不刷新，状态不丢失
    
*   `DllPlugin` 动态链接库（`dllPlugin`只适用于开发环境, 因为生产环境下打包一次就完了, 没有必要用于生产环境）
    *   前端框架如`react`、`vue`体积大，构建慢
        
    *   较稳定，不常升级版本，同一个版本只构建一次，不用每次都重新构建
        
    *   `webpack`已内置`DllPlugin`，不需要安装
        
    *   `DllPlugin`打包出`dll`文件
        
    *   `DllReferencePlugin`引用`dll`文件
        

**优化打包速度完整代码**

### webpack 性能优化 - 产出代码（线上运行）

**前言**

*   体积更小
*   合理分包，不重复加载
*   速度更快、内存使用更少

**产出代码优化**

*   小图片`base64`编码，减少`http`请求

## 9 HTTP

### HTTP 基础总结

**HTTP 状态码**

*   `1XX`：信息状态码
    *   `100 Continue` 继续，一般在发送`post`请求时，已发送了`http header`之后服务端将返回此信息，表示确认，之后发送具体参数信息
*   `2XX`：成功状态码
    *   `200 OK` 正常返回信息
    *   `201 Created` 请求成功并且服务器创建了新的资源
    *   `202 Accepted` 服务器已接受请求，但尚未处理
*   `3XX`：重定向
    *   `301 Moved Permanently` 请求的网页已永久移动到新位置。
    *   `302 Found` 临时性重定向。
    *   `303 See Other` 临时性重定向，且总是使用 `GET` 请求新的 `URI`。
    *   `304 Not Modified` 自从上次请求后，请求的网页未修改过。
*   `4XX`：客户端错误
    *   `400 Bad Request` 服务器无法理解请求的格式，客户端不应当尝试再次使用相同的内容发起请求。
    *   `401 Unauthorized` 请求未授权。
    *   `403 Forbidden` 禁止访问。
    *   `404 Not Found` 找不到如何与 `URI` 相匹配的资源。
*   `5XX:` 服务器错误
    *   `500 Internal Server Error` 最常见的服务器端错误。
    *   `503 Service Unavailable` 服务器端暂时无法处理请求（可能是过载或维护）。

**常见状态码**

*   `200` 成功
*   `301` 永久重定向（配合`location`，浏览器自动处理）
*   `302` 临时重定向（配合`location`，浏览器自动处理）
*   `304` 资源未被修改
*   `403` 没有权限访问，一般做权限角色
*   `404` 资源未找到
*   `500` `Internal Server Error`服务器内部错误
*   `502` `Bad Gateway`
*   `503` `Service Unavailable`
*   `504` `Gateway Timeout`网关超时

**502 与 504 的区别**

这两种异常状态码都与网关 `Gateway` 有关，首先明确两个概念

*   `Proxy (Gateway)`，反向代理层或者网关层。在公司级应用中一般使用 `Nginx` 扮演这个角色
*   `Application (Upstream server)`，应用层服务，作为 `Proxy` 层的上游服务。在公司中一般为各种语言编写的服务器应用，如 `Go/Java/Python/PHP/Node` 等
*   **此时关于 502 与 504 的区别就很显而易见**
    *   `502 Bad Gateway`：一般表现为你自己写的「应用层服务 (`Java/Go/PHP`) 挂了」，或者网关指定的上游服务直接指错了地址，网关层无法接收到响应
    *   `504 Gateway Timeout`：一般表现为「应用层服务 (`Upstream`) 超时，超过了 `Gatway` 配置的 `Timeout`」，如查库操作耗时三分钟，超过了 `Nginx` 配置的超时时间

**http headers**

*   **常见的 Request Headers**
    *   `Accept` 浏览器可接收的数据格式
    *   `Accept-Enconding` 浏览器可接收的压缩算法，如`gzip`
    *   `Accept-Language` 浏览器可接收的语言，如`zh-CN`
    *   `Connection:keep-alive` 一次`TCP`连接重复复用
    *   `Cookie`
    *   `Host` 请求的域名是什么
    *   `User-Agent`（简称`UA`） 浏览器信息
    *   `Content-type` 发送数据的格式，如`application/json`
*   **常见的 Response Headers**
    *   `Content-type` 返回数据的格式，如`application/json`
    *   `Content-length` 返回数据的大小，多少字节
    *   `Content-Encoding` 返回数据的压缩算法，如`gzip`
    *   `set-cookie`
*   **缓存相关的 Headers**
    *   `Cache Control`、`Expired`
    *   `Last-Modified`、`If-Modified-Since`
    *   `Etag`、`If-None-Match`

**从输入 URL 到显示出页面的整个过程**

*   **下载资源**：各个资源类型，下载过程
*   **加载过程**
    *   `DNS`解析：域名 => `IP`地址
    *   浏览器根据`IP`地址向服务器发起`HTTP`请求
    *   服务器处理`HTTP`请求，并返回浏览器
*   **渲染过程**
    *   根据`HTML`生成`DOM Tree`
    *   根据`CSS`生成`CSSOM`
    *   `DOM Tree`和`CSSOM`整合形成`Render Tree`，根据`Render Tree`渲染页面
    *   遇到`<script>`暂停渲染，优先加载并执行`JS`代码，执行完在解析渲染（JS 线程和渲染线程共用一个线程，JS 执行要暂停 DOM 渲染）
    *   直至把`Render Tree`渲染完成

**window.onload 和 DOMContentLoaded**

*   `window.onload` 页面的全部资源加载完才会执行，包括图片、视频等
*   `DOMContentLoaded` 渲染完即可，图片可能尚未下载

演示

**拓展：关于 Restful API**

*   一种新的`API`设计方法
*   传统`API`设计：把每个`url`当做一个功能
*   `Restful API`设计：把每个`url`当前一个唯一的资源
    *   **如何设计成一个资源**
        *   尽量不用`url`参数
            *   传统`API`设计：`/api/list?pageIndex=2`
            *   `Restful API`设计：`/api/list/2`
        *   用`method`表示操作类型
            *   传统`API`设计：
                *   `post`新增请求：`/api/create-blog`
                *   `post`更新请求：`/api/update-blog?id=100`
                *   `post`删除请求：`/api/delete-blog?id=100`
                *   `get`请求：`/api/get-blog?id=100`
            *   `Restful API`设计：
                *   `post`新增请求：`/api/blog`
                *   `patch`更新请求：`/api/blog/100`
                *   `delete`删除请求：`/api/blog/100`
                *   `get`请求：`/api/blog/100`

### HTTP 缓存

*   **关于缓存介绍**
    *   为什么需要缓存？减少网络请求（网络请求不稳定性），让页面渲染更快
    *   哪些资源可以被缓存？静态资源（`js` `css` `img`）`webpack`打包加`contenthash`根据内容生成`hash`
*   **http 缓存策略**（强制缓存 + 协商缓存）
    *   **强制缓存**
    *   **协商缓存**
        *   服务端缓存策略
        *   服务端判断客户端资源，是否和服务端资源一样
        *   如果判断一致则返回`304`（不在返回`js`、图片内容等资源），否则返回`200`和最新资源
        *   **服务端怎么判断客户端资源一样？** 根据资源标识
    *   **HTTP 缓存总结**
        
        ![](<./high-level.assets/1695616199108.png>)
    
*   **刷新操作方式，对缓存的影响**
    *   正常操作：地址栏输入`url`，跳转链接，前进后退
    *   手动操作：`F5`，点击刷新，右键菜单刷新
    *   强制刷新：`ctrl + F5` 或 `command + r`
*   **不同刷新操作，不同缓存策略**
    *   正常操作：强缓存有效，协商缓存有效
    *   手动操作：强缓存失效，协商缓存有效
    *   强制刷新：强缓存失效，协商缓存失效
*   **小结**
    *   强缓存`Cache-Contorl`、`Expired`（弃用）
    *   协商缓存`Last-Modified`/`If-Modified-Since`和`Etag`/`If-None-Matche`，`304`状态码
    *   完整流程图

### HTTP 协议 1.0 和 1.1 和 2.0 有什么区别

*   **HTTP1.0**
    *   最基础的`HTTP`协议
    *   支持基本的`GET`、`POST`方法
*   **HTTP1.1**
    *   缓存策略 `cache-control` `E-tag`
    *   支持长链接 `Connection:keep-alive` 一次`TCP`连接多次请求
    *   断点续传，状态码`206`
    *   支持新的方法 `PUT DELETE`等，可用于`Restful API`写法
*   **HTTP2.0**
    *   可压缩`header`，减少体积
    *   多路复用，一次`TCP`连接中可以多个`HTTP`并行请求
    *   服务端推送（实际中使用`websocket`）

**连环问：HTTP 协议和 UDP 协议有什么区别**

*   `HTTP`是应用层，`TCP`、`UDP`是传输层
*   `TCP`有连接（三次握手），有断开（四次挥手），传输稳定
*   `UDP`无连接，无断开不稳定传输，但效率高。如视频会议、语音通话

### WebSocket 和 HTTP 协议有什么区别

*   支持端对端通信
*   可由`client`发起，也可由`sever`发起
*   用于消息通知、直播间讨论区、聊天室、协同编辑

**WebSocket 连接过程**

*   先发起一个`HTTP`请求
*   成功之后在升级到`WebSocket`协议，再通讯

![](<./high-level.assets/1695616199830.png>)

**WebSocket 和 HTTP 区别**

*   `WebSocket`协议名是`ws://`，可双端发起请求（双端都可以`send`、`onmessage`）
*   `WebSocket`没有跨域限制
*   通过`send`和`onmessage`通讯（`HTTP`通过`req`、`res`）

**WebSocket 和 HTTP 长轮询的区别**

长轮询：一般是由客户端向服务端发出一个设置较长网络超时时间的 `HTTP` 请求，并在`Http`连接超时前，不主动断开连接；待客户端超时或有数据返回后，再次建立一个同样的`HTTP`请求，重复以上过程

*   `HTTP`长轮询：客户端发起请求，服务端阻塞，不会立即返回
    *   `HTTP`长轮询需要处理`timeout`，即`timeout`之后重新发起请求
*   `WebSocket`：客户端可发起请求，服务端也可发起请求

**ws 可升级为 wss（像 https）**

**实际项目中推荐使用 socket.io API 更简洁**

**WebSocket 基本使用例子**

### 请描述 TCP 三次握手和四次挥手

**建立 TCP 连接**

*   先建立连接，确保双方都有收发消息的能力
*   再传输内容（如发送一个`get`请求）
*   网络连接是`TCP`协议，传输内容是`HTTP`协议

**三次握手 - 建立连接**

*   `Client`发包，`Server`接收。`Server`就知道有`Client`要找我了
*   `Server`发包，`Client`接收。`Client`就知道`Server`已经收到消息
*   `Client`发包，`Server`接收。`Server`就知道`Client`要准备发送了
*   前两步确定双发都能收发消息，第三步确定双方都准备好了

**四次挥手 - 关闭连接**

*   `Client`发包，`Server`接收。`Server`就知道`Client`已请求结束
*   `Server`发包，`Client`接收。`Client`就知道`Server`已收到消息，我等待`server`传输完成了在关闭
*   `Server`发包，`Client`接收。`Client`就知道`Server`已经传输完成了，可以关闭连接了
*   `Client`发包，`Server`接收。`Server`就知道`Client`已经关闭了，`Server`可以关闭连接了

![](<./high-level.assets/1695616200389.png>)

![](<./high-level.assets/1695616200997.png>)

### HTTP 跨域请求时为什么要发送 options 请求

**跨域请求**

*   浏览器同源策略
*   同源策略一般限制`Ajax`网络请求，不能跨域请求`server`
*   不会限制`<link>` `<img>` `<script>` `<iframe>` 加载第三方资源

**JSONP 实现跨域**

**cors**

**多余的 options 请求**

![](<./high-level.assets/1695616201319.png>)

*   `options`是跨域请求之前的预检查
*   浏览器自行发起的，无需我们干预
*   不会影响实际的功能

### HTTP 请求中 token、cookie、session 有什么区别

**cookie**

*   `HTTP`无状态的，每次请求都要携带`cookie`, 以帮助识别身份
*   服务端也可以向客户端`set-cookie`,`cookie`大小`4kb`
*   默认有跨域限制：不可跨域共享，不可跨域传递`cookie`（可通过设置`withCredential`跨域传递`cookie`）

**cookie 本地存储**

*   `HTML5`之前`cookie`常被用于本地存储
*   `HTML5`之后推荐使用`localStorage`和`sessionStorage`

**现代浏览器开始禁止第三方 cookie**

*   和跨域限制不同，这里是：禁止网页引入第三方 js 设置`cookie`
*   打击第三方广告设置`cookie`
*   可以通过属性设置 `SameSite:Strict/Lax/None`

**cookie 和 session**

*   `cookie`用于登录验证，存储用户标识（`userId`）
*   `session`在服务端，存储用户详细信息，和`cookie`信息一一对应
*   `cookie+session`是常见的登录验证解决方案

![](<./high-level.assets/1695616203313.png>)

**token 和 cookie**

*   `cookie`是`HTTP`规范（每次请求都会携带），而`token`是自定义传递
*   `cookie`会默认被浏览器存储，而`token`需自己存储
*   `token`默认没有跨域限制

**JWT(json web token)**

*   前端发起登录，后端验证成功后，返回一个加密的`token`
*   前端自行存储这个`token`（其他包含了用户信息，加密的）
*   以后访问服务端接口，都携带着这个`token`，作为用户信息

**session 和 jwt 哪个更好？**

*   **session 的优点**
    *   用户信息存储在服务端，可快速封禁某个用户
    *   占用服务端内存，成本高
    *   多进程多服务器时不好同步，需要使用`redis`缓存
    *   默认有跨域限制
*   **JWT 的优点**
    *   不占用服务端内存，`token`存储在客户端浏览器
    *   多进程、多服务器不受影响
    *   没有跨域限制
    *   用户信息存储在客户端，无法快速封禁某用户（可以在服务端建立黑名单，也需要成本）
    *   万一服务端密钥被泄露，则用户信息全部丢失
    *   `token`体积一般比`cookie`大，会增加请求的数据量
*   如严格管理用户信息（保密、快速封禁）推荐使用`session`
*   没有特殊要求，推荐使用`JWT`

**如何实现 SSO(Single Sign On) 单点登录**

*   单点登录的`本质就是在多个应用系统中共享登录状态`，如果用户的登录状态是记录在 `Session` 中的，要实现共享登录状态，就要先共享 `Session`
    
*   所以实现单点登录的关键在于，如何让 `Session ID`（或 `Token`）在多个域中共享
    
*   **主域名相同，基于 cookie 实现单点登录**
    
    *   `cookie`默认不可跨域共享，但有些情况下可设置跨域共享
    *   主域名相同，如`www.baidu.com`、`image.baidu.com`
    *   设置`cookie domain`为主域`baidu.com`，即可共享`cookie`
    *   主域名不同，则`cookie`无法共享。可使用`sso`技术方案来做
*   **主域名不同，基于 SSO 技术方案实现**
    
    *   系统`A`、`B`、`SSO`域名都是独立的
    *   用户访问系统`A`，系统`A`重定向到`SSO`登录（登录页面在`SSO`）输入用户名密码提交到`SSO`，验证用户名密码，将登录状态写入`SSO`的`session`，同时将`token`作为参数返回给客户端
    *   客户端携带`token`去访问系统`A`，系统`A`携带`token`去`SSO`验证，`SSO`验证通过返回用户信息给系统`A`
    *   用户访问`B`系统，`B`系统没有登录，重定向到`SSO`获取`token`（由于`SSO`已经登录了，不需要重新登录认证，之前在`A`系统登录过）, 拿着`token`去`B`系统，`B`系统拿着`token`去`SSO`里面换取用户信息
    *   整个所有用户的登录、用户信息的保存、用户的`token`验证，全部都在`SSO`第三方独立的服务中处理

![](<./high-level.assets/1695616203680.png>)

### 什么是 HTTPS 中间人攻击，如何预防（HTTPS 加密过程、原理）

**HTTPS 加密传输**

*   `HTTP`是明文传输
*   `HTTPS`加密传输 `HTTP + TLS/SSL`

**TLS 中的加密**

*   **对称加密** 两边拥有相同的秘钥，两边都知道如何将密文加密解密。
*   **非对称加密** 有公钥私钥之分，公钥所有人都可以知道，可以将数据用公钥加密，但是将数据解密必须使用私钥解密，私钥只有分发公钥的一方才知道

**对称密钥加密和非对称密钥加密它们有什么区别**

*   对称密钥加密是最简单的一种加密方式，它的加解密用的都是相同的密钥，这样带来的好处就是加解密效率很快，但是并不安全，如果有人拿到了这把密钥那谁都可以进行解密了。
*   而非对称密钥会有两把密钥，一把是私钥，只有自己才有；一把是公钥，可以发布给任何人。并且加密的内容只有相匹配的密钥才能解。这样带来的一个好处就是能保证传输的内容是安全的，因为例如如果是公钥加密的数据，就算是第三方截取了这个数据但是没有对应的私钥也破解不了。不过它也有缺点，一是公钥因为是公开的，谁都可以过去，如果内容是通过私钥加密的话，那拥有对应公钥的黑客就可以用这个公钥来进行解密得到里面的信息；二来公钥里并没有包含服务器的信息，也就是并不能确保服务器身份的合法性；并且非对称加密的时候要消耗一定的时间，减低了数据的传输效率。

**HTTPS 加密的过程**

1.  客户端请求`www.baidu.com`
2.  服务端存储着公钥和私钥
3.  服务器把`CA`数字证书（包含公钥）响应式给客户端
4.  客户端解析证书拿到公钥，并生成随机码`KEY`（加密的`key`没有任何意义，如`ABC`只有服务端的私钥才能解密出来，黑客劫持了`KEY`也是没用的）
5.  客户端把解密后的`KEY`传递给服务端，作为接下来对称加密的密钥
6.  服务端拿私钥解密随机码`KEY`，使用随机码`KEY` 对传输数据进行对称加密
7.  把对称加密后的内容传输给客户端，客户端使用之前生成的随机码`KEY`进行解密数据

![](<./high-level.assets/1695616205010.png>)

**介绍下 https 中间人攻击的过程**

这个问题也可以问成为什么需要 CA 认证机构颁发证书？

我们假设如果不存在认证机构，则人人都可以制造证书，这就带来了 "中间人攻击" 问题。

**中间人攻击的过程如下**

*   客户端请求被劫持，将所有的请求发送到中间人的服务器
*   中间人服务器返回自己的证书
*   客户端创建随机数，使用中间人证书中的公钥进行加密发送给中间人服务器，中间人使用私钥对随机数解密并构造对称加密，对之后传输的内容进行加密传输
*   中间人通过客户端的随机数对客户端的数据进行解密
*   中间人与服务端建立合法的 https 连接（https 握手过程），与服务端之间使用对称加密进行数据传输，拿到服务端的响应数据，并通过与服务端建立的对称加密的秘钥进行解密
*   中间人再通过与客户端建立的对称加密对响应数据进行加密后传输给客户端
*   客户端通过与中间人建立的对称加密的秘钥对数据进行解密

简单来说，中间人攻击中，中间人首先伪装成服务端和客户端通信，然后又伪装成客户端和服务端进行通信（如图）。 整个过程中，由于缺少了证书的验证过程，虽然使用了`https`，但是传输的数据已经被监听，客户端却无法得知

![](<./high-level.assets/1695616206037.png>)

![](<./high-level.assets/1695616206083.png>)

**预防中间人攻击**

使用正规厂商的证书，慎用免费的

![](<./high-level.assets/1695616207337.png>)

## 10 Node

### 浏览器和 nodejs 事件循环（Event Loop）有什么区别

**单线程和异步**

*   JS 是单线程的，无论在浏览器还是在 nodejs
*   浏览器中 JS 执行和 DOM 渲染共用一个线程，是互斥的
*   异步是单线程的解决方案

**1. 浏览器中的事件循环**

**异步里面分宏任务和微任务**

*   宏任务：`setTimeout`，`setInterval`，`setImmediate`，`I/O`，`UI`渲染，网络请求
*   微任务：`Promise`，`process.nextTick`，`MutationObserver`、`async/await`
*   宏任务和微任务的区别：微任务的优先级高于宏任务，微任务会在当前宏任务执行完毕后立即执行，而宏任务会在下一个事件循环中执行
    *   宏任务在`页面渲染之后`执行
    *   微任务在`页面渲染之前`执行
    *   也就是微任务在下一轮`DOM`渲染之前执行，宏任务在`DOM`渲染之后执行

![](<./high-level.assets/1695616208557.png>)

![](<./high-level.assets/1695616209735.png>)

**2. nodejs 中的事件循环**

*   nodejs 也是单线程，也需要异步
*   异步任务也分为：宏任务 + 微任务
*   但是，它的宏任务和微任务分为不同的类型，有不同的优先级
*   和浏览器的主要区别就是`类型`和`优先级`，理解了这里就理解了 nodejs 的事件循环

**宏任务类型和优先级**

类型分为 6 个，优先级从高到底执行

*   **Timer**：`setTimeout`、`setInterval`
*   **I/O callbacks**：处理网络、流、TCP 的错误回调
*   **Idle,prepare**：闲置状态（nodejs 内部使用）
*   **Poll 轮询**：执行`poll`中的`I/O`队列
*   **Check 检查**：存储`setImmediate`回调
*   **Close callbacks**：关闭回调，如`socket.on('close')`

**注意**：`process.nextTick`优先级最高，`setTimeout`比`setImmediate`优先级高

**执行过程**

*   执行同步代码
*   执行微任务（`process.nextTick`优先级最高）
*   按顺序执行 6 个类型的宏任务（每个开始之前都执行当前的微任务）

![](<./high-level.assets/1695616210344.png>)

**总结**

*   浏览器和 nodejs 的事件循环流程基本相同
*   **nodejs 宏任务和微任务分类型，有优先级。浏览器里面的宏任务和微任务是没有类型和优先级的**
*   node17 之后推荐使用`setImmediate`代替`process.nextTick`（如果使用`process.nextTick`执行复杂任务导致后面的卡顿就得不偿失了，尽量使用低优先级的 api 去执行异步）

### nodejs 如何开启多进程，进程如何通讯

**进程 process 和线程 thread 的区别**

*   进程，`OS`进行资源分配和调度的最小单位，有独立的内存空间
*   线程，`OS`进程运算调度的最小单位，共享进程内存空间
*   JS 是单线程的，但可以开启多进程执行，如`WebWorker`

![](<./high-level.assets/1695616213575.png>)

**为何需要多进程**

*   多核 CPU，更适合处理多进程
*   内存较大，多个进程才能更好利用（单进程有内存上限）
*   总之，压榨机器资源，更快、更节省

**如何开启多进程**

*   开启子进程 `child_process.fork`和`cluster.fork`
    *   `child_process.fork`用于单个计算量较大的计算
    *   `cluster`用于开启多个进程，多个服务
*   使用`send`和`on`传递消息

**使用 child_process.fork 方式**

**使用 cluster 方式**

## 11 综合题目

### 你们的工作流程是怎么样的

**流程图**

下图是完整的大厂前端项目研发流程图

![](<./high-level.assets/1695616214788.png>)

**项目角色**

*   项目委员会：这是一个很虚的角色，即能确定项目是否要做的那帮人，有时候可能就是一个高级经理就能拍板确定。和我们实际开发没啥关系，不用去关心他。
*   `PM`：产品经理，也是一个项目的推动者，即兼职项目经理的角色。
*   `UE`：交互设计师，负责页面布局、交互的设计，不负责视图的细节。
*   `UI`：视觉设计师，交互确定之后，设计页面样式。注意，很多情况下，`UE` 和 `UI` 是一个人。
*   `RD`：后端开发人员。
*   `CRD`：客户端开发人员，安卓和 `ios` 都是。
*   `FE`：前端开发人员。
*   `QA`：测试人员。
*   `OP`：服务器运维人员，一般负责审批上线单

**主要流程**

**项目立项**

*   主要是各个部门的 `leader` 确定项目要做了，就是 “拍板儿” 确定。此时不需要工程师参与，因为决定权在于他们。项目立项时没有任何详细的信息，如需求、设计图等，都要后面继续做。
*   **编写需求和需求评审**
    *   `PM` 根据项目的背景和目标，编写需求文档，画原型图（不是 `UI` 设计图），然后叫各个角色开会评审。
    *   你如果作为 `FE` 角色去参与评审，要积极提出自己的问题和建议。需求评审不一定一次通过。
    *   如果此时 `PM` 跟你要工作排期，你不要立即回复。回去跟你的 `leader` 商量之后，给一个谨慎的排期。
*   **编写技术方案**
    *   需求指导设计，设计指导开发。先做技术方案设计，写文档，待评审之后再开发。
*   **技术方案评审**
    *   技术方案写完之后，要叫 `leader` ，以及其他技术角色人员一起评审。
        *   第一，和其他技术人员确定接口格式，是否都能认同
        *   第二，让 `leader` 或者架构师确定这个设计有没有漏洞、安全问题等
*   **交互视觉设计和评审**
    *   需求评审通过之后，`UE` 和 `UI` 就开始出设计稿。做完设计稿之后，会叫相关开发人员参与评审。和需求评审一样，你要提出自己的问题和建议。
*   **开发**
    *   上述评审都结束之后，才可以进入开发阶段。开发时要注意开发规范，及时 `code review`，写单元测试。
*   **视觉联调**
    *   网页界面开发完成之后，要找 `UI` 人员来视觉联调，让他们确认是否可以。如果不可以，就直接修改，直到评审通过。
    *   这一步要尽早执行，不要等待临上线了，再去调整 `UI` 界面。
*   **程序联调**
    *   代码功能开发完之后，要和其他相关技术人员（`RD`、`CRD`）进行接口联调。就是在开发环境下，先把系统对接起来，看看会不会出错。
    *   注意，接口联调不是测试，不用太过于项目，能把最基本的功能跑通即可。
*   **自测**
    *   对于自己开发的功能，一定要自己按照需求测试一遍。不要求测试的很详细，至少也把基本功能跑通。
    *   这一步是为了防止提测之后被 `QA` 发现基本功能不可用，就很尴尬。人家会觉得你不靠谱。
*   **提测**
    *   自测完成之后，即可把代码提测给 `QA` 。这一步很关键，要发邮件，抄送给项目组的相关成员。
*   **测试**
    *   `QA` 进行详细的功能测试。测试期间会有 `bug` 反馈，要及时修复 `bug` ，并及时让 `QA` 回归测试。
    *   测试期间要积极和 `QA` 沟通，最好每天都开一个站会。
*   **上线 & 回归测试**
    *   `QA` 测试完成会发邮件全体通报测试通过，测试就可以准备上线。
    *   上线之后要及时和 `QA` 组织回归测试，待回归测试完成之后才可以通知：上线完成
*   **项目总结（可选）**
    *   回顾一下经过，总结一下得失，积累一点经验，这样才能慢慢成长

### 工作中遇到过哪些项目难点，是如何解决的

**遇到问题要注意积累**

*   每个人都会遇到问题，总有几个问题让你头疼
*   日常要注意积累，解决了问题要自己写文章复盘

**如果之前没有积累**

*   回顾一下半年之内遇到的难题
*   思考当时解决方案，以及解决之后的效果
*   写一篇文章记录一下，答案就有了

**答案模板**

*   描述问题：背景 + 现象 + 造成的影响
*   问题如何被解决：分析 + 解决
*   自己的成长：学到了什么 + 以后如何避免

**一个示例**

*   问题：编辑器只能回显 JSON 格式的数据，而不支持老版本的 HTML 格式
*   解决：将老版本的 HTML 反解析成 JSON 格式即可解决
*   成长：要考虑完整的输入输出 + 考虑旧版本用户 + 参考其他产品

### 前端性能优化

**前言**

*   是一个综合性问题，没有标准答案，但要求尽量全面
*   某些细节可能会问：防抖、节流等

**性能优化原则**

*   多使用内存、缓存或其他方法
*   减少`CPU`计算量，减少网络加载耗时

**从何入手**

*   **让加载更快**
*   **让渲染更快**
    *   `CSS`放在`head`，`JS`放在`body`下面
    *   尽早开始执行`JS`，用`DOMContentLoaded`触发

### 前端常用的设计模式和使用场景

*   **工厂模式**
    *   用一个工厂函数来创建实例，使用的时候隐藏`new`，可在工厂函数中使用`new`（`function factory(a,b,c) {return new Foo()}`）
    *   如`jQuery`的`$`函数：`$`等于是在内部使用了`new JQuery`实例（用工厂函数`$`包裹了一下），可以直接使用`$(div)`
    *   `react`的`createElement`
*   **单例模式**
    *   全局唯一的实例（无法生成第二个）
    *   如`Vuex`、`Redux`的`store`
    *   如全局唯一的`dialog`、`modal`
    *   演示
*   **代理模式**
    *   使用者不能直接访问对象，而是访问一个代理层
    *   在代理层可以监听`get` `set`做很多事
    *   如`ES6 Proxy`实现`Vue3`响应式
*   **观察者模式**
    *   观察者模式（基于发布订阅模式）有观察者，也有被观察者
    *   **观察者需要放到被观察者中，被观察者的状态变化需要通知观察者** 我变化了，内部也是基于发布订阅模式，收集观察者，状态变化后要主动通知观察者
*   **发布订阅模式**
    *   发布订阅者模式，一种对象间一对多的依赖关系，当一个对象的状态发生改变时，所依赖它的对象都将得到状态改变的通知。
    *   **主要的作用 (优点)：**
        *   广泛应用于异步编程中 (替代了传递回调函数)
        *   对象之间松散耦合的编写代码
    *   **缺点：**
        *   创建订阅者本身要消耗一定的时间和内存
        *   多个发布者和订阅者嵌套一起的时候，程序难以跟踪维护
    *   **发布订阅者模式和观察者模式的区别？**
        *   发布 / 订阅模式是观察者模式的一种变形，两者区别在于，**发布 / 订阅模式在观察者模式的基础上，在目标和观察者之间增加一个调度中心。**
        *   **观察者模式**是由具体目标调度，比如当事件触发，`Subject` 就会去调用观察者的方法，所以观察者模式的订阅者与发布者之间是存在依赖的（互相认识的）。
        *   **发布 / 订阅模式**由统一调度中心调用，因此发布者和订阅者不需要知道对方的存在（`publisher`和`subscriber`是不认识的，中间有个`Event Channel`隔起来了）
        *   总结一下：
            *   观察者模式：`Subject`和`Observer`直接绑定，没有中间媒介。如`addEventListener`直接绑定事件
            *   发布订阅模式：`publisher`和`subscriber`互相不认识，需要有中间媒介`Event Channel`。如`EventBus`自定义事件
                
                ![](<./high-level.assets/1695616216430.png>)
        
    *   **实现的思路：**
        *   创建一个对象 (缓存列表)
        *   `on`方法用来把回调函数`fn`都加到缓存列表中
        *   `emit` 根据`key`值去执行对应缓存列表中的函数
        *   `off`方法可以根据`key`值取消订阅
*   **装饰器模式**
    *   原功能不变，增加一些新功能（`AOP`面向切面编程）
    *   `ES`和`TS`的`Decorator`语法就是装饰器模式

经典设计模式有`23` 个，这是基于后端写的，前端不是都常用

### 如果一个 H5 很慢，如何排查性能问题

*   通过前端性能指标分析
*   通过`Performance`、`lighthouse`分析
*   持续跟进，持续优化

**前端性能指标**

*   `FP(First Paint)`：首次绘制，即首次绘制任何内容到屏幕上
*   `FCP(First Content Paint)`：首次内容绘制，即首次绘制非空白内容到屏幕上
*   `FMP(First Meaning Paint)`：首次有意义绘制，即首次绘制有意义的内容到屏幕上 - 已弃用，改用`LCP`
    *   `FMP`业务指标，没有统一标准
*   `LCP(Largest Contentful Paint)`：最大内容绘制，即最大的内容绘制到屏幕上
*   `TTI(Time to Interactive)`：可交互时间，即页面加载完成，可以进行交互的时间
*   `TBT(Total Blocking Time)`：总阻塞时间，即页面加载过程中，主线程被占用的时间
*   `CLS(Cumulative Layout Shift)`：累计布局偏移，即页面加载过程中，元素位置发生变化的程度
*   `FCP`、`LCP`、`TTI`、`TBT`、`CLS`都是`web-vitals`库提供的指标
*   `DCL(DOM Content Loaded)`：`DOM`加载完成，即页面`DOM`结构加载完成的时间
*   `L(Load)`：页面完全加载完成的时间

![](<./high-level.assets/1695616218043.png>)

**通过 Chrome Performance 分析**

打开浏览器无痕模式，点击`Performance > ScreenShot`

![](<./high-level.assets/1695616220111.png>)

如果加载很快就会很快就到达`FP`，在分析`FCP、LCP、DCL、L`看渲染时间

![](<./high-level.assets/1695616222152.png>)

国内访问 GitHub 可以看到加载到`FP`非常慢，但是渲染很快

![](<./high-level.assets/1695616224719.png>)

`network > show overview` 查看每个资源的加载时间，或者从`waterfall`查看

![](<./high-level.assets/1695616226650.png>)

**使用 lighthouse 分析**

![](<./high-level.assets/1695616227808.png>)

**通过工具就可以识别到问题**

*   加载慢？
    *   优化服务器硬件配置，使用`CDN`
    *   路由懒加载，大组件异步加载 -- 减少主包体积
    *   优化`HTTP`缓存策略
*   渲染慢
    *   优化服务端接口（如`Ajax`获取数据慢）
    *   继续分析，优化前端组件内部逻辑（参考`vue`、`react`优化）
    *   服务端渲染`SSR`

性能优化是一个循序渐进的过程，不像 bug 一次解决。持续跟进统计结果，再逐步分析性能瓶颈，持续优化。可使用第三方统计服务，如百度统计

### 后端一次性返回十万条数据，你该如何渲染

*   **设计不合理**
    *   后端返回十万条数据，本身技术方案设计就不合理（一般情况都是分页返回，返回十万条浏览器渲染是一个问题，十万条数据加载也需要一个过程）
    *   后端的问题，要用后端的思维去解决 - 中间层
*   浏览器能否处理十万条数据？
    *   渲染到`DOM`上会非常卡顿
*   **方案 1：自定义中间层**
    *   自定义`nodejs`中间层，获取并拆分这十万条数据
    *   前端对接`nodejs`中间层，而不是服务端
    *   成本比较高
*   **方案 2：虚拟列表**
    *   只创建可视区的`DOM`（比如前十条数据），其他区域不显示，根据数据条数计算每条数据的高度，用`div`撑起高度
    *   随着浏览器的滚动，创建和销毁`DOM`
    *   虚拟列表实现起来非常复杂，工作中可使用第三方库（`vue-virtual-scroll-list`、`react-virtualiszed`）
    *   虚拟列表只是无奈的选择，实现复杂效果而效果不一定好（低配手机）

![](<./high-level.assets/1695616227842.png>)

### H5 页面如何进行首屏优化

*   **路由懒加载**
    *   适用于单页面应用
    *   路由拆分，优先保证首页加载
*   **服务端渲染 SSR**
    *   `SSR`渲染页面过程简单，性能好
    *   纯`H5`页面，`SSR`是性能优化的终极方案，但对服务器成本也高
*   **分页**
    *   针对列表页，默认只展示第一页内容
    *   上划加载更多
*   **图片懒加载 lazyLoad**
    *   针对详情页，默认只展示文本内容，然后触发图片懒加载
    *   注意：提前设置图片尺寸，尽量只重绘不重排
*   **Hybrid**
    *   提前将`HTML JS CSS`下载到`App`内部，省去我们从网上下载静态资源的时间
    *   在`App webview`中使用`file://`协议加载页面文件
    *   再用`Ajax`获取内容并展示
*   性能优化要配合分析、统计、评分等，做了事情要有结果有说服力
*   性能优化也要配合体验，如骨架屏、`loading`动画等

**图片懒加载演示**

### 请描述 js-bridge 的实现原理

**什么是 JS Bridge**

*   `JS`无法直接调用`native API`
*   需要通过一些特定的格式来调用
*   这些格式就统称`js-bridge`，例如微信`JSSKD`

![](<./high-level.assets/1695616229010.png>)

![](<./high-level.assets/1695616231302.png>)

**JS Bridge 的常见实现方式**

*   注册全局`API`
*   `URL Scheme`（推荐）

### 从零搭建开发环境需要考虑什么

*   代码仓库，发布到哪个`npm`仓库（如有需要）
*   技术选型，`Vue`或`React`
*   代码目录规范
*   打包构建`webpack`等，做打包优化
*   `eslint`、`prettier`、`commit-lint`
*   `pre-commit` 提交前检查（在调用`git commit` 命令时自动执行某些脚本检测代码, 若检测出错, 则阻止`commit`代码, 也就无法`push`）
*   单元测试
*   `CI/CD`流程（如搭建`jenkins`部署项目）
*   开发环境、预发布环境
*   编写开发文档

### 如果你是项目前端技术负责人，将如何做技术选型（常考）

*   **技术选型，选什么？**
    *   前端框架（`Vue React Nuxt.hs Next.js` 或者`nodejs`框架）
    *   语言（`JavaScript`或`Typescript`）
    *   其他（构建工具、`CI/CD`等）
*   **技术选型的依据**
    *   社区是否足够成熟
    *   公司已经有了经验积累
    *   团队成员的学习成本
    *   要站在公司角度，而非个人角度
*   **要全面考虑各种成本**
    *   学习成本
    *   管理成本（如用`TS`遍地都是`any`怎么办）
    *   运维成本（如用`ssr`技术）

### 高效的字符串前缀匹配如何做

*   有一个英文单词库（数组），里面有几十个英文单词
*   输入一个字符串，快速判断是不是某一个单词的前缀
*   说明思路，不用写代码

**思路分析**

*   常规思路
    *   遍历单词库数组
    *   `indexOf`判断前缀
    *   实际复杂度超过了`O(n)`，因为每一步遍历要考虑`indexOf`的计算量
*   优化
    *   英文字母一共`26`个，可以提前把单词库数组拆分为`26`个
    *   第一层拆分为`26`个，第二第三层也可以继续拆分
    *   最后把单词库拆分为一颗树
    *   如`array`拆分为`{a:{r:{r:{a:{y:{}}}}}}` 查询的时候这样查`obj.a.r.r.a.y` 时间复杂度就是`O(1)`
    *   转为为树的过程我们不用管，单词库更新频率一般都是很低的，我们执行一次提前转换好，通过哈希表（对象）查询`key`非常快
*   性能分析
    *   如遍历数组，时间复杂度至少`O(n)`起步（`n`是数组长度）
    *   改为树，时间复杂度从大于`O(n)`降低到`O(m)`（`m`是单词的长度）
    *   哈希表（对象）通过`key`查询，时间复杂度是`O(1)`

### 前端路由原理

**hash 的特点**

*   `hash`变化会触发网页跳转，即浏览器的前进和后退
*   `hash`变化不会刷新页面，`SPA`必须的特点
*   `hash`永远不会提交到`server`端
*   通过`onhashchange`监听

**H5 History**

*   用`url`规范的路由，但跳转时不刷新页面
*   通过`history.pushState`和`history.onpopstate`监听
*   `H5 History`需要后端支持
    *   当我们进入到子路由时刷新页面，`web`容器没有相对应的页面此时会出现`404`
    *   所以我们只需要配置将任意页面都重定向到 `index.html`，把路由交由前端处理
    *   对`nginx`配置文件`.conf`修改，添加`try_files $uri $uri/ /index.html;`

**两者选择**

*   `to B`系统推荐使用 hash，简单易用，对`url`规范不敏感
*   `to C`系统，可以考虑使用`H5 History`，但需要服务端支持
*   能选择简单的，就别用复杂的，要考虑成本和收益

### 首屏渲染优化

*   `css` / `js` 分割，使首屏依赖的文件体积最小，内联首屏关键 `css` / `js`；
*   非关键性的文件尽可能的 异步加载和懒加载，避免阻塞首页渲染；
*   使用`dns-prefetch` / `preconnect` / `prefetch` / preload 等浏览器提供的资源提示，加快文件传输；
*   谨慎控制好 Web 字体，一个大字体包足够让你功亏一篑
    *   控制字体包的加载时机；
    *   如果使用的字体有限，那尽可能只将使用的文字单独打包，能有效减少体积； 合理利用 `Localstorage` / `services worker` 等存储方式进行 数据与资源缓存
*   **分清轻重缓急**
    *   重要的元素优先渲染；
    *   视窗内的元素优先渲染
*   **服务端渲染 (SSR)**:
    *   减少首屏需要的数据量，剔除冗余数据和请求；
    *   控制好缓存，对数据 / 页面进行合理的缓存；
    *   页面的请求使用流的形式进行传递；
*   **优化用户感知**
    *   利用一些动画 过渡效果，能有效减少用户对卡顿的感知；
    *   尽可能利用 骨架屏 (`Placeholder`) / `Loading` 等减少用户对白屏的感知；
    *   动画帧数尽量保证在 `30帧` 以上，低帧数、卡顿的动画宁愿不要；
    *   js 执行时间避免超过 `100ms`，超过的话就需要做
        *   寻找可 缓存 的点
        *   任务的 分割异步 或 `web worker` 执行

**移动端的性能优化**

1.  首屏加载和按需加载，懒加载
2.  资源预加载
3.  图片压缩处理，使用`base64`内嵌图片
4.  合理缓存`dom`对象
5.  使用`touchstart`代替`click`（`click 300`毫秒的延迟）
6.  利用`transform:translateZ(0)`，开启硬件 GUP 加速
7.  不滥用`web`字体，不滥用`float`（布局计算消耗性能），减少`font-size`声明
8.  使用`viewport`固定屏幕渲染，加速页面渲染内容
9.  尽量使用事件代理，避免直接事件绑定

### interface 和 type 的区别（常考）

在 TypeScript 中，`interface`和`type`都用于定义类型，但它们有一些区别：

1.  语法差异：

*   `interface`：使用`interface`关键字来定义接口，例如：`interface Person { name: string; age: number; }`
*   `type`：使用`type`关键字来定义类型别名，例如：`type Person = { name: string; age: number; }`

2.  可扩展性：

*   `interface`：接口可以通过继承或合并来扩展，可以在定义接口时使用`extends`关键字继承其他接口，也可以使用`&`运算符合并多个接口。
*   `type`：类型别名不支持继承或合并，它只能用于定义现有类型的别名。

3.  表达能力：

*   `interface`：接口可以描述对象、函数、类等复杂类型，还可以定义可选属性、只读属性、函数类型等。
*   `type`：类型别名可以描述对象、联合类型、交叉类型等，但不支持定义类和接口。

4.  使用场景：

*   `interface`：适用于定义对象的形状和结构，以及类的实现。
*   `type`：适用于定义复杂类型别名、联合类型、交叉类型等。

总的来说，`interface`更适合用于定义对象的形状和结构，而`type`更适合用于定义复杂类型别名和联合类型。在实际使用中，可以根据具体需求选择使用哪种方式。

## 12 手写题

### 防抖

防抖函数原理：**把触发非常频繁的事件合并成一次去执行** 在指定时间内只执行一次回调函数，如果在指定的时间内又触发了该事件，则回调函数的执行时间会基于此刻重新开始计算

![](<./high-level.assets/1695616234206.png>)

![](<./high-level.assets/1695616236002.png>)

防抖动和节流本质是不一样的。**防抖动是将多次执行变为`最后一次执行`，节流是将多次执行变成`每隔一段时间执行`**

eg. 像百度搜索，就应该用防抖，当我连续不断输入时，不会发送请求；当我一段时间内不输入了，才会发送一次请求；如果小于这段时间继续输入的话，时间会重新计算，也不会发送请求。

**手写简化版:**

**适用场景：**

*   文本输入的验证，连续输入文字后发送 AJAX 请求进行验证，验证一次就好
*   按钮提交场景：防止多次提交按钮，只执行最后提交的一次
*   服务端验证场景：表单验证需要服务端配合，只执行一段连续的输入事件的最后一次，还有搜索联想词功能类似

### 节流

节流函数原理: 指频繁触发事件时，只会在指定的时间段内执行事件回调，即触发事件间隔大于等于指定的时间才会执行回调函数。总结起来就是：**事件，按照一段时间的间隔来进行触发**。

![](<./high-level.assets/1695616236781.png>)

![](<./high-level.assets/1695616237496.png>)

像 dom 的拖拽，如果用消抖的话，就会出现卡顿的感觉，因为只在停止的时候执行了一次，这个时候就应该用节流，在一定时间内多次执行，会流畅很多

**手写简版**

使用时间戳的节流函数会在第一次触发事件时立即执行，以后每过 `wait` 秒之后才执行一次，并且最后一次触发事件不会被执行

**时间戳方式：**

**定时器方式：**

使用定时器的节流函数在第一次触发时不会执行，而是在 delay 秒之后才执行，当最后一次停止触发后，还会再执行一次函数

**适用场景：**

*   拖拽场景：固定时间内只执行一次，防止超高频次触发位置变动。`DOM` 元素的拖拽功能实现（`mousemove`）
*   缩放场景：监控浏览器`resize`
*   滚动场景：监听滚动`scroll`事件判断是否到页面底部自动加载更多
*   动画场景：避免短时间内多次触发动画引起性能问题

**总结**

*   **函数防抖**：`限制执行次数，多次密集的触发只执行一次`
    *   将几次操作合并为一次操作进行。原理是维护一个计时器，规定在`delay`时间后触发函数，但是在`delay`时间内再次触发的话，就会取消之前的计时器而重新设置。这样一来，只有最后一次操作能被触发。
*   **函数节流**：`限制执行的频率，按照一定的时间间隔有节奏的执行`
    *   使得一定时间内只触发一次函数。原理是通过判断是否到达一定时间来触发函数。

### New 的过程

**new 操作符做了这些事：**

*   创建一个全新的对象`obj`，继承构造函数的原型：这个对象的`__proto__`要指向构造函数的原型`prototype`
*   执行构造函数，使用 `call/apply` 改变 `this` 的指向（将`obj`作为`this`）
*   返回值为`object`类型则作为`new`方法的返回值返回，否则返回上述全新对象`obj`

### instanceOf 原理

**思路：**

*   步骤 1：先取得当前类的原型，当前实例对象的原型链
*   步骤 2：一直循环（执行原型链的查找机制）
    *   取得当前实例对象原型链的原型链（`proto = proto.__proto__`，沿着原型链一直向上查找）
    *   如果当前实例的原型链`__proto__`上找到了当前类的原型`prototype`，则返回 `true`
    *   如果一直找到`Object.prototype.__proto__ == null`，`Object`的基类 (`null`) 上面都没找到，则返回 `false`

![](<./high-level.assets/1695616239677.png>)

### 实现 call 方法

**call 做了什么:**

*   将函数设为对象的属性
*   执行和删除这个函数
*   指定`this`到函数并传入给定参数执行函数
*   如果不传入参数，默认指向 `window`

**分析：如何在函数执行时绑定 this**

*   如`var obj = {x:100,fn() { this.x }}`
*   执行`obj.fn()` , 此时`fn`内部的`this`就指向了`obj`
*   可借此来实现函数绑定`this`

原生`call`、`apply`传入的`this`如果是值类型，会被`new Object`（如`fn.call('abc')`）

### 实现 apply 方法

思路: 利用`this`的上下文特性。`apply`其实就是改一下参数的问题

### 实现 bind 方法

`bind` 的实现对比其他两个函数略微地复杂了一点，涉及到参数合并 (类似函数柯里化)，因为 `bind` 需要返回一个函数，需要判断一些边界问题，以下是 `bind` 的实现

*   `bind` 返回了一个函数，对于函数来说有两种方式调用，一种是直接调用，一种是通过 `new` 的方式，我们先来说直接调用的方式
*   对于直接调用来说，这里选择了 `apply` 的方式实现，但是对于参数需要注意以下情况：因为 `bind` 可以实现类似这样的代码 `f.bind(obj, 1)(2)`，所以我们需要将两边的参数拼接起来
*   最后来说通过 `new` 的方式，对于 `new` 的情况来说，不会被任何方式改变 `this`，所以对于这种情况我们需要忽略传入的 `this`
*   箭头函数的底层是`bind`，无法改变`this`，只能改变参数

**简洁版本**

*   对于普通函数，绑定`this`指向
*   对于构造函数，要保证原函数的原型对象上的属性不能丢失

**注意**： `bind`之后不能再次修改`this`的指向（箭头函数的底层实现原理依赖`bind`绑定 this 后不能再次修改`this`的特性），`bind`多次后执行，函数`this`还是指向第一次`bind`的对象

### 发布订阅模式

**简介：**

发布订阅者模式，一种对象间一对多的依赖关系，但一个对象的状态发生改变时，所依赖它的对象都将得到状态改变的通知。

**主要的作用 (优点)：**

1.  广泛应用于异步编程中 (替代了传递回调函数)
2.  对象之间松散耦合的编写代码

**缺点：**

*   创建订阅者本身要消耗一定的时间和内存
*   多个发布者和订阅者嵌套一起的时候，程序难以跟踪维护

**实现的思路：**

*   创建一个对象 (缓存列表)
*   `on`方法用来把回调函数`fn`都加到缓存列表中
*   `emit` 根据`key`值去执行对应缓存列表中的函数
*   `off`方法可以根据`key`值取消订阅

**测试用例**

**发布订阅者模式和观察者模式的区别？**

*   发布 / 订阅模式是观察者模式的一种变形，两者区别在于，**发布 / 订阅模式在观察者模式的基础上，在目标和观察者之间增加一个调度中心。**
*   **观察者模式**是由具体目标调度，比如当事件触发，`Subject` 就会去调用观察者的方法，所以观察者模式的订阅者与发布者之间是存在依赖的。
*   **发布 / 订阅模式**由统一调度中心调用，因此发布者和订阅者不需要知道对方的存在。

### 手写 JS 深拷贝 - 考虑各种数据类型和循环引用

*   **使用 JSON.stringify**
    *   无法转换函数
    *   无法转换`Map`和`Set`
    *   无法转换循环引用
*   **普通深拷贝**
    *   只考虑`Object`和`Array`
    *   无法转换`Map`、`Set`和循环引用
    *   只能应对初级要求的技术一面

**普通深拷贝 - 只考虑了简单的数组、对象**

**深拷贝 - 考虑数组、对象、Map、Set、循环引用**

### 用 JS 实现一个 LRU 缓存

*   **什么是 LRU 缓存**
    *   `LRU（Least Recently Used）` 最近最少使用
    *   假如我们有一块内存，专门用来缓存我们最近访问的网页，访问一个新网页，我们就会往内存中添加一个网页地址，随着网页的不断增加，内存存满了，这个时候我们就需要考虑删除一些网页了。这个时候我们找到内存中最早访问的那个网页地址，然后把它删掉。这一整个过程就可以称之为 `LRU` 算法
    *   核心两个`API`，`get`和`set`
*   **分析**
    *   用哈希表存储数据，这样`get` `set`才够快，时间复杂度`O(1)`
    *   必须是有序的，常用数据放在前面，沉水数据放在后面
    *   哈希表 + 有序，就是`Map`

### 手写 curry 函数，实现函数柯里化

**分析**

*   `curry`返回的是一个函数`fn`
*   执行`fn`，中间状态返回函数，如`add(1)`或者`add(1)(2)`
*   最后返回执行结果，如`add(1)(2)(3)`

### 手写一个 LazyMan，实现 sleep 机制

*   支持`sleep`和`eat`两个方法
*   支持链式调用

**思路**

*   由于有`sleep`功能，函数不能直接在调用时触发
*   初始化一个列表，把函数注册进去
*   由每个`item`触发`next`执行（遇到`sleep`则异步触发，使用`setTimeout`）

![](<./high-level.assets/1695616240408.png>)

### 手写一个 getType 函数，获取详细的数据类型

*   **获取类型**
    *   手写一个`getType`函数，传入任意变量，可准确获取类型
    *   如`number`、`string`、`boolean`等值类型
    *   引用类型`object`、`array`、`map`、`regexp`

### 手写一个 JS 函数，实现数组扁平化 Array Flatten

*   写一个 JS 函数，实现数组扁平化，只减少一次嵌套
*   如输入`[1,[2,[3]],4]` 输出`[1,2,[3],4]`

**思路**

*   定义空数组`arr=[]` 遍历当前数组
*   如果`item`非数组，则累加到`arr`
*   如果`item`是数组，则遍历之后累加到`arr`

**连环问：手写一个 JS 函数，实现数组深度扁平化**

*   如输入`[1, [2, [3]], 4]` 输出`[1,2,3,4]`

**思路**

*   先实现一级扁平化，然后递归调用，直到全部扁平化

### 把一个数组转换为树

![](<./high-level.assets/1695616241639.png>)

**树节点**

**思路**

*   遍历数组
*   每个元素生成`TreeNode`
*   找到`parentNode`，并加入它的`children`
    *   如何找到`parentNode`
        *   遍历数组去查找太慢
        *   可用一个`Map`来维护关系，便于查找

**连环问：把一个树转换为数组**

*   **思路**
    *   遍历树节点（广度优先：一层层去遍历，结果是`ABCDEF`）而深度优先是（`ABDECF`）
    *   将树节点转为`Array Item`，`push`到数组中
    *   根据父子关系，找到`Array Item`的`parentId`
        *   如何找到`parentId`
            *   遍历树查找太慢
            *   可用一个`Map`来维护关系，便于查找

### 获取当前页面 URL 参数

**将 URL 参数解析为 JSON 对象**

### 手写 Promise 加载一张图片

### 两个数组求交集和并集

### JS 反转字符串

实现字符串`A1B2C3`反转为`3C2B1A`

### 设计实现一个 H5 图片懒加载

*   **分析**
    *   定义 `<img src="loading.png" data-src="xx.png" />`
    *   页面滚动时，图片露出，将`data-src`赋值给`src`
    *   滚动要节流
*   **获取图片定位**
    *   元素的位置`ele.getBoundingClientRect`
        
        ![](<./high-level.assets/1695616244868.png>)
        
    *   图片`top > window.innerHeight`没有露出，`top < window.innerHeight`露出

### 手写 Vue3 基本响应式原理

### 实现一个简洁版的 promise

## 13 算法题

### 时间复杂度与空间复杂度基本概念

**什么是复杂度**

*   程序执行需要的计算量和内存空间
*   复杂度是数量级（方便记忆推广）不是具体的数字
*   一般针对一个具体的算法，而非一个完整的系统

![](<./high-level.assets/1695616247705.png>)

**时间复杂度 - 程序执行时需要的计算量（CPU）**

*   `O(n)`一次就够（数量级）
*   `O(n)`和传输的数据一样（数量级）
*   `O(n^2)`数据量的平方（数量级）
*   `O(logn)`数据量的对数（数量级）
*   `O(n*logn)`数据量 * 数据量的对数（数量级）

**空间复杂度 - 程序执行时需要的内存空间**

*   `O(1)`有限的、可数的空间（数量级）
*   `O(n)`和输入的数据量相同的空间（数量级）

### 实现数字千分位格式化

*   将数字千分位格式化，输出字符串
*   如输入数字`13050100`输出`13,050,100`
*   注意：逆序判断（从后往前判断）

**思路分析**

*   转化为数组，`reverse`，每三位拆分
*   使用正则表达式
*   使用字符串拆分

**性能分析**

*   使用数组，转化影响性能
*   使用正则表达式，性能较差
*   使用字符串性能较好，推荐答案

**划重点**

*   顺序，从尾到头
*   尽量不要转化数据结构
*   慎用正则表达式，性能较慢

**获取 1-10000 之前所有的对称数（回文数）**

*   求`1-10000`之间所有的对称数（回文）
*   例如：`0,1,2,11,22,101,232,1221...`

**思路分析**

*   思路 1：使用数组反转比较
    *   数字转为字符串，在转为数组
    *   数组`reverse`，在`join`为字符串
    *   前后字符串进行对比
    *   看似是`O(n)`, 但数组转换、操作都需要时间，所以慢
*   思路 2：字符串前后比较
    *   数字转为字符串
    *   字符串头尾字符比较
    *   思路 2 vs 思路 3，直接操作数字更快
*   思路 3：生成翻转数
    *   使用`%`和`Math.floor()`生成翻转数
    *   前后数字进行对比
    *   全程操作数字，没有字符串类型

**总结**

*   尽量不要转换数据结构，尤其是数组这种有序结构
*   尽量不要用内置 API，如`reverse`等不好识别复杂度
*   数字操作最快，其次是字符串

### 实现快速排序并说明时间复杂度

**思路分析**

*   找到中间位置`midValue`
*   遍历数组，小于`midValue`放在`left`，否则放在`right`
*   继续递归，最后`concat`拼接返回
*   使用`splice`会修改原数组，使用`slice`不会修改原数组（推荐）
*   一层遍历 + 二分的时间复杂度是`O(nlogn)`

![](<./high-level.assets/1695616249620.png>)

**快速排序（使用 splice）**

**快速排序（使用 slice）**

### 将数组中的 0 移动到末尾

*   如输入 `[1,0,3,0,11,0]` 输出 `[1,3,11,0,0,0]`
*   只移动`0`其他顺序不变
*   必须在原数组进行操作

如果不限制 “必须在原数组进行操作”

*   定义`part1,part2`两个数组
*   遍历数组，非`0` `push`到`part1`,`0` `push`到`part2`
*   返回合并`part1.concat(part2)`

**思路分析**

*   嵌套循环：传统思路
    *   遇到`0` `push`到数组末尾
    *   用`splice`截取当前元素
    *   时间复杂度是`O(n^2)` 算法基本不可用 (`splice`移动数组元素复杂度是`O(n)`，`for`循环遍历数组复杂度是`O(n)`，整体是`O(n^2)`)
    *   数组是连续存储空间，要慎用`shift`、`unshift`、`splice`等 API
*   双指针方式：解决嵌套循环的一个非常有效的方式
    *   定义`j`指向第一个`0`，`i`指向`j`后面的第一个非`0`
    *   交换`i`和`j`的值，继续向后移动
    *   只遍历一次，所以时间复杂度是`O(n)`

**移动 0 到数组的末尾（嵌套循环）**

**移动 0 到数组末尾（双指针）**

### 求斐波那契数列的第 n 值

*   计算斐波那契数列的第 n 值
*   注意时间复杂度

**分析**

*   `f(0) = 0`
*   `f(1) = 1`
*   `f(n) = f(n - 1) + f(n - 2)` 结果 = 前一个数 + 前两个数 0 1 1 2 3 5 8 13 21 34 ...

**1. 斐波那契数列（递归）**

*   递归，大量重复计算，时间复杂度`O(2^n)`，`n`越大越慢可能崩溃，完全不可用

![](<./high-level.assets/1695616251037.png>)

**拓展 - 动态规划**

*   把一个大问题拆为一个小问题，逐级向下拆解 `f(n) = f(n - 1) + f(n - 2)`
*   用递归的思路去分析问题，再改为循环来实现
*   算法三大思维：贪心、二分、动态规划

**2. 拓展：青蛙跳台阶**

*   一只青蛙，一次可跳一级，也可跳两级
*   请问：青蛙一次跳上 n 级台阶，有多少种方式

**用动态归还分析问题**

*   `f(1) = 1` 一次跳一级
*   `f(2) = 2` 一次跳二级
*   `f(n) = f(n - 1) + f(n - 2)` 跳`n`级

**3. 斐波那契数列（循环）**

*   不用递归，用循环
*   记录中间结果
*   优化后时间复杂度`O(n)`

### 给一个数组，找出其中和为 n 的两个元素（两数之和）

*   有一个递增数组`[1,2,4,7,11,15]`和一个`n=15`
*   数组中有两个数，和是`n`。即`4 + 11 = 15`
*   写一个函数，找出这两个数

**思路分析**

*   嵌套循环，找到一个数，然后去遍历下一个数，求和判断，时间复杂度是 `O(n^2)` 基本不可用
*   双指针方式，时间复杂度降低到`O(n)`
    *   定义`i`指向头
    *   定义`j`指向尾
    *   求`arr[i] + arr[j]`的和，如果大于`n`，则 j 向前移动`j--`，如果小于`n`，则`i`向后移动`i++`
*   优化`嵌套循环`，可以考虑`双指针`

**寻找和为 n 的两个数（嵌套循环）**

**查找和为 n 的两个数（双指针）**

随便找两个数，如果和大于`n`的话，则需要向前寻找，如果小于`n`的话，则需要向后寻找 -- `二分的思想`

### 实现二分查找并分析时间复杂度

**思路分析**

二分查找，每次都取`1/2`，缩小范围，直到找到那个数为止

![](<./high-level.assets/1695616252013.png>)

*   递归，代码逻辑更加清晰
*   非递归，性能更好
*   二分查找时间复杂度 `O(logn)` 非常快

![](<./high-level.assets/1695616253880.png>)

**总结**

*   只要是可排序的，都可以用二分查找
*   只要用二分的思想，时间复杂度必包含`O(logn)`

**二分查找（循环）**

**二分查找（递归）**

### 实现队列功能

**1. 请用两个栈，实现一个队列功能**

功能 `add/delete/length`

*   数组实现队列，队列特点：先进先出
*   队列是逻辑结构，抽象模型，简单的可以用数组、链表来实现

![](<./high-level.assets/1695616256378.png>)

性能分析：时间复杂度：`add O(1)`、`delate O(n)` 空间复杂度整体是`O(n)`

**2. 使用链表实现队列**

**可能追问：链表和数组，哪个实现队列更快？**

*   数组是连续存储，`push`很快，`shift`很慢
*   链表：查询慢（把链表全部遍历一遍查询）时间复杂度：`O(n)`，新增和删除快（修改指针指向）时间复杂度：`O(1)`
*   数组：查询快（根据下标）时间复杂度：`O(1)`，新增和删除慢（移动元素）时间复杂度：`O(n)`
*   结论：`链表实现队列更快`

**思路分析**

![](<./high-level.assets/1695616256959.png>)

*   使用单项链表，但要同时记录`head`和`tail`
*   要从`tail`入队，从`head`出队，否则出队时`tail`不好定位
*   `length`要实时记录单独存储，不可遍历链表获取`length`（否则遍历时间复杂度是`O(n)`）

### 手写判断一个字符串 "{a(b[c]d)e}f" 是否括号匹配

利用栈先进后出的思想实现括号匹配，时间复杂度`O(n)`，空间复杂度`O(n)`

## 14 开放问题

### 面试结束面试官问你想了解什么

一定要问这三个问题

*   部门所做的产品和业务（赛道），产品的用量和规模（看产品是否核心）
*   部门有多少人，有什么角色（问出部门是否规范）
*   项目的技术栈（看技术栈是否老旧）

### 工作中遇到过哪些项目难点，是如何解决的

**遇到问题要注意积累**

*   每个人都会遇到问题，总有几个问题让你头疼
*   日常要注意积累，解决了问题要自己写文章复盘

**如果之前没有积累**

*   回顾一下半年之内遇到的难题
*   思考当时解决方案，以及解决之后的效果
*   写一篇文章记录一下，答案就有了

**答案模板**

*   描述问题：背景 + 现象 + 造成的影响
*   问题如何被解决：分析 + 解决
*   自己的成长：学到了什么 + 以后如何避免

**一个示例**

*   问题：编辑器只能回显 JSON 格式的数据，而不支持老版本的 HTML 格式
*   解决：将老版本的 HTML 反解析成 JSON 格式即可解决
*   成长：要考虑完整的输入输出 + 考虑旧版本用户 + 参考其他产品

### 你未来发展怎么规划的

我想在工作中再创新高，我希望在三年以内能够在我职业上做出点成绩，比如达到架构师，我希望能在公司做技术强的人之一，能够带领更多同事做的更好

### 你期望加入一家什么样的公司

业务好，赛道好，技术牛逼 (抬高对方)，能够让自己更好的成长，我希望除了以上这些外，公司还要有发展空间，希望入职的这家公司我有用武之地 (贬低自己)，未来我希望跟这家公司走的很远 (稳定性)，我希望能成为这家公司的前端 leader，引领前端团队，这也是我的目标。我感觉贵公司是我梦想中的公司

### 平常除了开发还会做什么？

*   有时间去看一下 b 站老师的分享，提高自己的认知，比如说看 xx 的分享
*   报课学习成长
*   如果面试官问，天天学习你不觉得无趣吗，你可以回复，也不会一天到晚都在学习，我也经常运动（足球、篮球）（不要回复其他兴趣看书啥的），人家就是想看你的团队协作性怎么样

### 怎么看待加班

员工应该站在公司的角度适应公司的发展，看公司当前业务的需要，公司需要我就会加班，对公司有利我们就冲，我相信一个优秀的公司是合理安排员工的休息的时间的，也不是靠加班加出来的，也有规范的流程，当然该加班的时候还得加

### 你最大的缺点

*   比如你是做前端的，你可以说你对运维那块的部署相关不熟悉，经验还不足等等。你是做后端的，你可以说你对那些炫酷的页面交互不太熟悉。
*   优秀案例：突出你好学的心态
    *   以前因为工作的关系不常用 xxx 技术栈，在业余时间略有接触，但是理解还不够深。
    *   但是自从 xxx 后，我就买了有关的书籍和一些视频教学深度学习。
    *   每天都会下班后用一个小时的时间在掘金，CSDN 等论坛活跃，阅读网友的文章。同时我也会把我自己的疑惑跟大家交流，大家一起进步，让我在这方面越来越熟

### 你觉得你有哪些不足之处

*   我觉得自己在 xx 方面存在不足（不足限制在技术上聊，不要谈其他容易掉 HR 的坑里）
*   但我已意识到并开始学习
*   我估计在 xx 时间把这块给补齐

**要限定一个范围**

*   技术方面的
*   非核心技术栈的，即有不足也无大碍
*   些容易弥补的，后面才能 “翻身”

**错误的示范**

*   我爱睡懒觉、总是迟到 —— 非技术方面
*   我自学的 Vue ，但还没有实践过 —— 核心技术栈
*   我不懂 React —— 技术栈太大，不容易弥补

**正确的示范**

*   脚手架，我还在学习中，还不熟练
*   nodejs 还需要继续深入学习

### 优雅谈薪的技巧

*   **先询问对方能给多少**
    *   虽说不要打太极，但也别跟愣头青一样，直接就报价了，你可以先问一下对方到底能给多少，给两个范例
        *   基于我前面的面试表现，贵公司最多能给到多少呢？
        *   我看招聘需求上的 20~35K 浮动较大，所以我想先问一下，您们这边具体能给多少？
    *   有些 HR 会直接摊牌，有些则会把皮球再踢回来，让你先出价
*   **根据自身情况合理报价**
    *   把这个事先准备好的薪资报出去即可（记得要比真实期望高个 1~2K）
    *   能报具体数字，就别报范围值，好比你报 18~20，HR 就会当成 18K
*   **结合企业情况报价**
    *   你可以根据企业的规模来报价。规模越大，你报出的具体数字可以越高，因为大企业有能力开出你要的工资，不过前提是你能让对方满意
    *   同时，大家在面试前，也可以提前查一下对应公司的薪资，咋查呢？脉脉、职友集等平台都行，如：
*   **结合面试发挥情况报价**
    *   之前制定期望薪资时，咱们不是整了一个范围值嘛？为此大家也要学会变通，面试发挥得越好，报出的数字可以越高，这样做的好处在于：能让你有机会拿到更高的薪资，方便后续选 Offer。
    *   当然，面试发挥比较差时，可以适当报低一点
*   **基于手里的 Offer 报价**
    *   因为手上已经有 Offer 了，此时可以寻求更高的薪资，比如手里有一个 15K 的，这次则可以试着去抬到 17、18K。如果成功了，意味着你每月又能多出 2~3K，就算失败了，也有上一个 Offer 兜底
    *   注意点：如果 HR 没有问 “有没有其他 Offer” 时，那最好别自己主动说出来
    *   因为这样做，会让 HR 觉得有股 “胁迫” 的味道在里面，如：
        *   我现在手里拿到了一个 18K 的 Offer，所以我的期望薪资是 20K
    *   这就好像是 “你不给我开 20K，我就不考虑你们” 的意思，正因如此，基于手里的 Offer 报价时，千万别用这样 “威胁式” 的抬价手段
*   **细聊薪资的组成结构**
    *   当你们双方谈妥工资后，别忘了问清楚薪资的结构，不然被坑了，也只能是哑巴吃黄连，如果你不知道怎么问，可以从这些方向出发
        *   五险一金什么时候交？以基本工资为准还是工资总额？
        *   薪资的组成结构是什么样的（基本工资、绩效工资的比例）？
        *   多薪制是签在合同里面，还是按绩效作为年终奖发放？
    *   同时，如果你的简历写了期望薪资，那谈薪会十分轻松，毕竟看了你的简历后，依旧把你喊过来面试，代表这家企业绝对能给到这个工资。为此，在简历写上期望薪资的小伙伴，将是最容易谈薪的一群人，直接按照简历上的薪资报价即可，也无需揣测用人方真实的招聘薪资~