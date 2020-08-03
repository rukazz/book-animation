<template>
	<div id="container">
		<div id="box" class="bg" :class="{ final: finalShow }">
			<div id="content" v-show="!finalShow">
				<transition name="fade">
					<div
						class="indexBook bg"
						v-if="indexBookShow"
						@click="indexBookClick"
					>
						<div class="title bg">
							为什么<br />我还想<br />爱这个<br />世界<br />
						</div>
						<div class="from">出版社：概率论社交实验站</div>
					</div>
				</transition>
				<transition name="fade">
					<!-- 翻书 -->
					<div
						id="book"
						ref="book"
						@touchstart="touchHandle"
						@touchmove="touchHandle"
						@touchend="touchHandle"
						v-if="bookShow"
					>
						<div class="page" :style="{ zIndex: zIndexs[0] }">
							<div
								class="shadow"
								:style="{ opacity: shadowOpacity }"
								v-if="shadowOpacity && currentTouchPageIndex + 1 == 0"
							></div>
							<div class="front bg" @click="nextPage">
								<div class="cover">
									<div class="title bg">
										为什么<br />我还想<br />爱这个<br />世界<br />
									</div>
									<div class="from">出版社：概率论社交实验站</div>
								</div>
							</div>
							<div class="back bg" @click="prevPage">
								<div class="back__shadow"></div>
							</div>
						</div>
						<div class="page" :style="{ zIndex: zIndexs[1] }">
							<div
								class="shadow"
								:style="{ opacity: shadowOpacity }"
								v-if="shadowOpacity && currentTouchPageIndex + 1 == 1"
							></div>
							<div class="front bg" @click="nextPage">
								<!-- 序言 -->
								<div class="foreword">
									<div class="foreword_title">序言</div>
									<div class="foreword_content">
										<template v-if="Source === 'business'">
											<p>出品人：概率论</p>
											<p><br /></p>
										</template>
										<p>当你翻开这本书的时候</p>
										<p>请放下心里的一切焦虑和不愉快</p>
										<p>试着在后面的书页中</p>
										<p>圈出那些让你觉得人间值得的词语</p>
										<p>我们会根据它们</p>
										<p>谱写出一首属于你的生命之诗</p>
									</div>
								</div>
							</div>
							<div class="back bg" @click="prevPage">
								<div class="back__shadow"></div>
							</div>
						</div>
						<div class="page" :style="{ zIndex: zIndexs[2] }">
							<div
								class="shadow"
								:style="{ opacity: shadowOpacity }"
								v-if="shadowOpacity && currentTouchPageIndex + 1 == 2"
							></div>
							<div class="front bg" @click="nextPage">
								<!-- 活动须知 -->
								<div class="directory">
									<div class="directory_title">目录</div>
									<ul class="directory_list">
										<li>
											<span class="name">一口吃掉</span>
											<span class="line"></span>
											<span class="num">1</span>
										</li>
										<li>
											<span class="name">在远方</span>
											<span class="line"></span>
											<span class="num">4</span>
										</li>
										<li>
											<span class="name">人间烟火</span>
											<span class="line"></span>
											<span class="num">7</span>
										</li>
										<li>
											<span class="name">爱的方程式</span>
											<span class="line"></span>
											<span class="num">10</span>
										</li>
									</ul>
								</div>
							</div>
							<div class="back bg" @click="prevPage">
								<div class="back__shadow"></div>
							</div>
						</div>
						<div
							class="page"
							:style="{ zIndex: zIndexs[3 + index] }"
							v-for="(item, index) in chooses"
							:key="index"
						>
							<div
								class="shadow"
								:style="{ opacity: shadowOpacity }"
								v-if="shadowOpacity && currentTouchPageIndex + 1 == 3 + index"
							></div>
							<div class="front bg" @click="nextPage">
								<!-- 选项 -->
								<div class="choose">
									<div class="choose_title">
										<span
											v-for="(letterItem, letterIndex) in item.title.split('')"
											:key="letterIndex"
											>{{ letterItem }}</span
										>
									</div>
									<div class="choose_options">
										<div
											class="choose_options_item"
											v-for="(optionItem, optionIndex) in item.options"
											:key="optionIndex"
											:style="{
												left: item.positions[optionIndex].left + 'vw',
												top: item.positions[optionIndex].top + 'vw'
											}"
											@click.stop="choose(index, optionIndex)"
										>
											<div class="text">
												<span
													v-for="(letter,
													letterIndex) in optionItem.value.split('')"
													:key="letterIndex"
													>{{ letter }}</span
												>
											</div>
											<transition name="fade">
												<span
													class="bg choosed"
													:class="[optionItem.class]"
													v-if="optionItem.choosed"
												></span>
											</transition>
										</div>
									</div>
								</div>
								<span class="pagenum">{{ index + 1 }}</span>
							</div>
							<div class="back bg" @click="prevPage">
								<div class="back__shadow"></div>
							</div>
						</div>
						<div class="page" :style="{ zIndex: zIndexs[3 + chooses.length] }">
							<div
								class="shadow"
								:style="{ opacity: shadowOpacity }"
								v-if="
									shadowOpacity &&
										currentTouchPageIndex + 1 == 3 + chooses.length
								"
							></div>
							<div class="front bg" @click="nextPage">
								<!-- 活动须知 -->
								<div class="foreword">
									<div class="foreword_title">结语</div>
									<div class="foreword_content">
										<p>在前面的书页中</p>
										<p>如果你找到了许多动心的事物</p>
										<p>那么恭喜——</p>
										<p>你已拥有了许多抵御糟糕的生命能量</p>
										<br />
										<p>如果你只找到寥寥几个</p>
										<p>也不必因此丧气</p>
										<p>这本书只收录了世间很小一部分事物</p>
										<p>那些琐碎的欢愉和惬意</p>
										<p>都正躲在生活的角落里</p>
										<p>等你光临</p>
									</div>
								</div>
							</div>
							<div class="back bg" @click="prevPage">
								<div class="back__shadow"></div>
							</div>
						</div>
						<div
							class="page"
							:style="{ zIndex: zIndexs[3 + chooses.length + 1] }"
						>
							<div
								class="shadow"
								:style="{ opacity: shadowOpacity }"
								v-if="
									shadowOpacity &&
										currentTouchPageIndex + 1 == 3 + chooses.length + 1
								"
							></div>
							<div class="front bg">
								<!-- 输入 -->
								<div class="input">
									<div class="input_title">请输入你的昵称</div>
									<input
										type="text"
										class="input_el"
										maxlength="10"
										v-model.trim="inputValue"
										ref="inputEl"
										@focus="focusHandle()"
										@blur="blurHandle()"
									/>
									<span class="business" v-if="Source === 'business'"
										>该诗集由「概率论」出品</span
									>
								</div>
							</div>
							<div class="back bg" @click="prevPage">
								<div class="back__shadow"></div>
							</div>
						</div>
					</div>
				</transition>
				<!-- 按钮 -->
				<transition name="fade">
					<button
						@click="submit"
						class="submitBtn"
						data-value="提交"
						v-if="submitBtnShow"
					></button>
				</transition>
				<!-- 翻页按钮 -->
				<template v-if="turnPageBtnShow">
					<button
						class="prevBtn bg"
						@click="prevPage"
						:class="{ disabled: currentShowPageIndex <= 0 }"
					></button>
					<button
						class="nextBtn bg"
						@click="nextPage"
						:class="{ disabled: currentShowPageIndex >= PageLength - 1 }"
					></button>
				</template>
				<!-- 操作提示 -->
				<transition name="fade">
					<div
						class="tipCircle"
						:style="tipCircle[curTip].styles"
						v-if="tipCircle[curTip]"
					>
						<span class="circle bg"></span>
						<span class="line bg"></span>
						<span class="word">{{ tipCircle[curTip].text }}</span>
					</div>
				</transition>
			</div>
			<!-- 结果页 -->
			<div id="final_content_box" v-if="finalShow">
				<div id="final_content">
					<!-- 标题 -->
					<transition-group
						tag="div"
						class="final_title"
						@enter="titleEnterHandle"
					>
						<span
							v-for="(item, index) in finalObj.title"
							:key="'title' + index"
							:data-index="index"
							v-html="item == '\n' ? '<br />' : item"
						></span>
					</transition-group>
					<!-- 作者 -->
					<transition-group
						tag="div"
						class="final_nickname"
						@enter="nicknameEnterHandle"
					>
						<span
							v-for="(item, index) in finalObj.from"
							:key="'from' + index"
							:data-index="index"
							v-html="item == '\n' ? '<br />' : item"
						></span>
					</transition-group>
					<!-- 正文 -->
					<transition-group
						tag="div"
						class="final_words"
						@enter="wordsEnterHandle"
					>
						<span
							v-for="(item, index) in finalObj.content"
							:key="'content' + index"
							:data-index="index"
							v-html="item == '\n' ? '<br />' : item"
						></span>
					</transition-group>
					<transition name="fade">
						<span class="saveImgTip bg" v-if="saveImgShow"></span>
					</transition>
				</div>
				<!-- 保存的图片 -->
				<img
					:src="baseData"
					class="TheImg"
					:class="{ longpress: isWeixin }"
					v-if="imgShow"
				/>
				<!-- 返回按钮 -->
				<transition name="slideLeft">
					<button
						class="backBtn bg"
						@click="backToBook"
						v-if="backBtnShow"
					></button>
				</transition>
			</div>
			<!-- 滑动提示 -->
			<transition name="fade">
				<div
					class="touchTip bg"
					v-if="touchTipShow && !finalShow"
					@click="touchTipShow = false"
				></div>
			</transition>
		</div>
		<!-- 生成图片的模版 -->
		<div id="screenshot" ref="screenshot">
			<img :src="cdnLink + 'img/final_long.jpg'" class="screenshot_bg" />
			<img :src="cdnLink + 'img/final_long.jpg'" class="screenshot_bg2" />
			<div class="content">
				<!-- 二维码区域 -->
				<div class="qrbox">
					<img
						:src="cdnLink + 'img/' + qrcodeFilename + '.png'"
						class="qrcode"
					/>
					<span class="qrtext">扫码生成你的诗</span>
					<span class="business" v-if="Source === 'business'"
						>该诗集由「概率论」出品</span
					>
				</div>
				<!-- 标题 -->
				<div class="final_title">
					<span
						v-for="(item, index) in finalObj.__title"
						:key="index"
						v-html="item == '\n' ? '<br />' : item"
					></span>
				</div>
				<!-- 作者 -->
				<div class="final_nickname">
					<span
						v-for="(item, index) in finalObj.__from"
						:key="index"
						v-html="item == '\n' ? '<br />' : item"
					></span>
				</div>
				<!-- 正文 -->
				<div class="final_words">
					<span
						v-for="(item, index) in finalObj.__content"
						:key="index"
						v-html="item == '\n' ? '<br />' : item"
					></span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { TweenMax } from "gsap";
import html2canvas from "html2canvas";
import BScroll from "better-scroll";
import util from "../util";
import config from "../config";
const cdnLink = config.cdnLink;
const Width = window.innerWidth;
const MoveWidth = Width / 2;
const MaxRotation = 140;
const isWeixin = util.isWeixin();
const Source = config.Source;
const Positions = [
	[
		{ left: 27, top: 23 },
		{ left: 46, top: 37 },
		{ left: 68, top: 25 },
		{ left: 35, top: 62 },
		{ left: 58, top: 65 },
		{ left: 24, top: 95 },
		{ left: 48, top: 94 },
		{ left: 70, top: 95 }
	],
	[
		{ left: 26, top: 25 },
		{ left: 49, top: 29 },
		{ left: 70, top: 23 },
		{ left: 33, top: 58 },
		{ left: 61, top: 56 },
		{ left: 25, top: 99 },
		{ left: 46, top: 85 },
		{ left: 71, top: 95 }
	],
	[
		{ left: 33, top: 26 },
		{ left: 61, top: 26 },
		{ left: 32, top: 59 },
		{ left: 49, top: 46 },
		{ left: 66, top: 60 },
		{ left: 26, top: 99 },
		{ left: 48, top: 94 },
		{ left: 68, top: 99 }
	]
];
const chooses = [
	{
		title: "一口吃掉",
		options: [
			{
				value: "火锅",
				des: "永远满分服务的海底捞"
			},
			{
				value: "麻辣烫",
				des: "学校门口人潮涌动的麻辣烫"
			},
			{
				value: "烧烤",
				des: "路边永远都要排队的烧烤小摊"
			},
			{
				value: "小龙虾",
				des: "呼朋引伴最爱的小龙虾"
			},
			{
				value: "鳗鱼饭",
				des: "生命不可或缺的鳗鱼饭"
			},
			{
				value: "烤鱼",
				des: "开心不开心都要吃的烤鱼"
			},
			{
				value: "关东煮",
				des: "四季的关东煮热气蒸腾"
			},
			{
				value: "绝味鸭脖",
				des: "武汉来的正宗绝味鸭脖"
			}
		]
	},
	{
		title: "一口吃掉",
		options: [
			{
				value: "奶茶",
				des: "这天下的千百种奶茶还未尝遍"
			},
			{
				value: "雪碧",
				des: "柠檬与雪碧在玻璃杯中碰撞清脆声响"
			},
			{
				value: "可乐",
				des: "一大口可乐下肚时满足的饱嗝"
			},
			{
				value: "真果粒",
				des: "金主爸爸的真果粒还在路上"
			},
			{
				value: "酸奶",
				des: "随时能够赶走坏心情的酸奶"
			},
			{
				value: "妈妈的菜",
				des: "妈妈的那道拿手菜总能随需随到"
			},
			{
				value: "冰镇西瓜",
				des: "夏天的冰镇西瓜还没吃到"
			},
			{
				value: "薯片",
				des: "和罗曼蒂克最配的薯片咔滋咔滋脆"
			}
		]
	},
	{
		title: "一口吃掉",
		options: [
			{
				value: "冰美式",
				des: "味苦却能真实缓解疲惫的冰美式"
			},
			{
				value: "热干面",
				des: "疫情结束了可以去吃的热干面"
			},
			{
				value: "酸辣粉",
				des: "粮荒时永远能救急的酸辣粉"
			},
			{
				value: "螺蛳粉",
				des: "一口上头的螺蛳粉香臭满屋"
			},
			{
				value: "榴莲千层",
				des: "还没等到喜欢的人送我榴莲千层"
			},
			{
				value: "肠粉",
				des: "广东阿姨总亲切地喊靓女/靓仔食肠粉"
			},
			{
				value: "猪脚饭",
				des: "一起吃猪脚饭的那个人就快到了"
			}
		]
	},
	{
		title: "在远方",
		options: [
			{
				value: "游乐园",
				des: "可以随时允许我变回小朋友的游乐园"
			},
			{
				value: "蹦极",
				des: "写下要去蹦极的计划还没划掉"
			},
			{
				value: "徒步",
				des: "还想徒步进深山野营看星星"
			},
			{
				value: "旅行",
				des: "那些说走就走的旅行还差好几万个"
			},
			{
				value: "探险",
				des: "星座里说冒险家要四处探险"
			},
			{
				value: "森林",
				des: "森林里的奇幻漂流还在等我"
			},
			{
				value: "滑板",
				des: "脚底生风的滑板带我走向极乐"
			},
			{
				value: "乐高",
				des: "新买的乐高才拼了一半"
			}
		]
	},
	{
		title: "在远方",
		options: [
			{
				value: "游戏",
				des: "游戏里的队友每晚都在等我上线"
			},
			{
				value: "烟火大会",
				des: "那场相约已久的烟火大会还要去看"
			},
			{
				value: "海水",
				des: "想要季风带来海水微咸的味道"
			},
			{
				value: "山川",
				des: "山川四季怎么也看不够"
			},
			{
				value: "小岛",
				des: "买个小岛隐居的生活还没实现"
			},
			{
				value: "马车",
				des: "还在等南瓜马车载着爱情前来"
			},
			{
				value: "不打烊书店",
				des: "不打烊书店的灯光永远温柔"
			},
			{
				value: "买得起的书籍",
				des: "世间好书大概都不贵"
			}
		]
	},
	{
		title: "在远方",
		options: [
			{
				value: "动漫",
				des: "追的番剧还在等待完结的那天"
			},
			{
				value: "沙漠",
				des: "要一脚踩进风沙里与沙漠相接"
			},
			{
				value: "云",
				des: "夏季日暮的云彩总是带来好消息"
			},
			{
				value: "绿皮火车",
				des: "要追随缓缓前行的绿皮火车到远方"
			},
			{
				value: "自驾游",
				des: "考了驾照要整个自驾游"
			},
			{
				value: "音乐节",
				des: "山中狂欢三天三夜的音乐节"
			},
			{
				value: "极光",
				des: "听说幸运的人才能看到的极光"
			},
			{
				value: "杏木",
				des: "伊犁万顷野蛮生长的杏花"
			}
		]
	},
	{
		title: "人间烟火",
		options: [
			{
				value: "蝉鸣",
				des: "初夏的蝉鸣每一年都爱听"
			},
			{
				value: "猫咪的呼噜",
				des: "蹲在家门口等我回来的猫"
			},
			{
				value: "灯光",
				des: "路口不论多晚都亮着的灯光"
			},
			{
				value: "夏天的裙",
				des: "想在夏天的裙摆飞扬里做着青春的梦"
			},
			{
				value: "朝阳",
				des: "晒得满是阳光味道的被子"
			},
			{
				value: "落日",
				des: "落日余晖时的袅袅炊烟等我回家"
			},
			{
				value: "音乐",
				des: "总有一首音乐让我眷恋人间"
			},
			{
				value: "懒觉",
				des: "闲时懒觉登顶极乐世界"
			}
		]
	},
	{
		title: "人间烟火",
		options: [
			{
				value: "盲盒",
				des: "每一个明天都像抽盲盒那样让人惊喜"
			},
			{
				value: "春天",
				des: "春天的樱花已经开了"
			},
			{
				value: "夏天",
				des: "夏季的阵雨总能洗刷掉所有坏心情"
			},
			{
				value: "秋天",
				des: "秋叶陨落时要捡起来放进书中"
			},
			{
				value: "冬天",
				des: "凛冬的壁炉有刚刚好的温暖"
			},
			{
				value: "风扇",
				des: "吱呀作响的风扇带来旋转的快乐"
			},
			{
				value: "24小时便利店",
				des: "24小时便利店是永远的安慰剂"
			},
			{
				value: "一早的豆浆",
				des: "每日清晨的豆浆能唤醒内心深处的斗志"
			}
		]
	},
	{
		title: "人间烟火",
		options: [
			{
				value: "街道",
				des: "街道上的烟火气让人想和世界恋爱"
			},
			{
				value: "花不完的存款",
				des: "钱太多了可以花个几辈子"
			},
			{
				value: "菜市场",
				des: "叫卖声此起彼伏的菜市场"
			},
			{
				value: "胡同",
				des: "远亲不如近邻的胡同玩伴"
			},
			{
				value: "麦田",
				des: "麦田里的蛙声阵阵"
			},
			{
				value: "集市",
				des: "集市的人潮涌动让人贪恋不已"
			},
			{
				value: "懒人沙发",
				des: "疲惫时把整个身子包容的懒人沙发"
			},
			{
				value: "早餐铺子",
				des: "早餐铺子掀开笼屉那一刻蒸腾的水汽"
			}
		]
	},
	{
		title: "爱的方程式",
		options: [
			{
				value: "未上映的电影",
				des: "这世间的好电影正在向我奔来"
			},
			{
				value: "喜欢的人在身边",
				des: "好不容易得到的爱情要抓住很久很久"
			},
			{
				value: "温柔",
				des: "温柔的人间和山水"
			},
			{
				value: "勇气",
				des: "想在世间闯一闯的勇气"
			},
			{
				value: "被爱着",
				des: "还被需要和在意着"
			},
			{
				value: "有所依",
				des: "有想念和依赖的人"
			},
			{
				value: "羁绊",
				des: "千丝万缕的羁绊无法割舍"
			},
			{
				value: "有所期待",
				des: "生活中的期许还剩下许许多多"
			}
		]
	},
	{
		title: "爱的方程式",
		options: [
			{
				value: "青春尚好",
				des: "我还是个小年轻欸拜托"
			},
			{
				value: "靓仔",
				des: "甚多靓仔在等我"
			},
			{
				value: "暗恋",
				des: "等待长长的暗恋能走到尽头"
			},
			{
				value: "感动",
				des: "有过的感动足以支撑晦涩的人生"
			},
			{
				value: "成长",
				des: "成长还在继续"
			},
			{
				value: "家人",
				des: "毫无条件给予爱的家人"
			},
			{
				value: "陌生人",
				des: "擦肩而过的陌生人总怀着善意的笑"
			},
			{
				value: "值得追随的人",
				des: "那个闪闪发光的人还在指引着我向前走"
			}
		]
	},
	{
		title: "爱的方程式",
		options: [
			{
				value: "朋友",
				des: "从来不会让我偷偷难过的朋友"
			},
			{
				value: "流浪的毛孩子",
				des: "还在流浪的毛孩子要全都救下来"
			},
			{
				value: "牵挂",
				des: "只要有牵挂的人就持续喜欢这个世界"
			},
			{
				value: "热爱的工作",
				des: "好难得遇上一份热爱至死的工作"
			},
			{
				value: "喜欢的专业",
				des: "不是每个人都幸运地读到想要的专业"
			},
			{
				value: "睿智的师长",
				des: "传道受业解惑的老师想多多见面"
			},
			{
				value: "知己",
				des: "不必再多言语知己也能明白我"
			},
			{
				value: "未来可期",
				des: "曾有人祝我未来可期"
			}
		]
	}
].map(item => {
	item.positions = Positions[util.random(0, Positions.length - 1)];
	return item;
});
const endWords = [
	"没有一个春天不会到来\n所以我们走过了春分",
	"每一个刚刚苏醒的早晨\n野���飞舞，带来所有的好消息",
	"真的，生活的愉悦清单\n这样就够了",
	"把每一天的热爱都储藏起来\n然后小心翼翼地复习快乐",
	"别人对这个世界的态度如何\n与我又有什么相干",
	"让不快乐早夭\n让欢愉长存",
	"太阳还会再次升起\n所以最好别轻易后退",
	"低头是阳光的剪影\n融化了正在冷却的人群与我",
	"每一场阵雨后的蛛网摇晃着\n彩虹色的晶莹已经到来",
	"春日的序曲是什么\n是时间深处的无限可能",
	"天空失落羽毛的时候\n总是轻盈而没有负担",
	"诚实地快乐与悲伤\n这样的日子已经很好了",
	"自由飘散在风中\n而生活住在风里"
];
const startWords = [
	"大抵是因为",
	"或许是",
	"因为",
	"而这是答案",
	"当然是",
	"是的，是因为",
	"大抵是"
];
const PageLength = 3 + chooses.length + 2;
const brDelay = 0.5;

export default {
	data() {
		return {
			Source: Source,
			cdnLink: cdnLink,
			isWeixin: isWeixin,
			currentShowPageIndex: 0,
			currentTouchPageIndex: -1,
			shadowOpacity: 0,
			zIndexs: new Array(PageLength).fill(0).map((item, index) => {
				return PageLength - index;
			}),
			PageLength: PageLength,
			chooses: chooses,
			inputValue: "",
			finalShow: false,
			finalObj: {
				title: "",
				__title: "",
				from: "",
				__from: "",
				content: "",
				__content: ""
			},
			saveImgShow: false,
			imgShow: false,
			backBtnShow: false,
			baseData: "",
			indexBookShow: true,
			bookShow: false,
			tipCircle: {
				tip1: {
					styles: {
						left: "68vw",
						// top: Source==="business" ? "116vw" : "120vw",
						top: "120vw"
					},
					text: "点击打开关于你的诗"
				},
				tip2: {
					styles: {
						left: "42.5vw",
						top: "120vw"
					},
					text: "开始选择"
				}
			},
			curTip: "tip1",
			touchTipShow: false,
			hadToEndPage: false
		};
	},
	computed: {
		submitBtnShow() {
			return (
				this.bookShow && this.currentShowPageIndex >= 3 && this.hadToEndPage
			);
		},
		turnPageBtnShow() {
			return this.bookShow;
		},
		qrcodeFilename() {
			let name = "";
			switch (Source) {
				case "business":
					name = "qrcode_tui_business";
					break;
				case "one":
					name = ["qrcode_tui_one", "qrcode_tui_new"][util.random(0, 1)];
					break;
				default:
					name = "qrcode_tui";
					break;
			}
			console.log(name);
			return name;
		}
	},
	mounted() {
		this.canTouch = true;
		const myUserInfo = util.Storage("user") || {};
		this.inputValue = myUserInfo.nickname || "";
	},
	methods: {
		scrollInit() {
			this.bs && this.bs.destroy();
			this.bs = new BScroll("#final_content_box", {
				scrollX: false,
				scrollY: true,
				click: true,
				preventDefaultException: {
					className: /(^|\s)TheImg(\s|$)/
				}
			});
			console.log(this.bs);
		},
		submit() {
			const list = this.chooses
				.map(item => {
					return item.options.filter(optionItem => {
						return optionItem.choosed;
					});
				})
				.filter(item => {
					return item.length > 0;
				});
			if (list.length > 0) {
				const options_choosed = list.reduce((a, b) => {
					return a.concat(b);
				});
				this.finalShow = true;
				this.$nextTick(() => {
					this.setFinalWord(options_choosed);
					this.scrollInit();
				});
			} else {
				this.$toast("请先选择一些选项吧");
			}
		},
		backToBook() {
			this.finalShow = false;
			this.baseData = "";
			this.saveImgShow = false;
			this.imgShow = false;
			this.backBtnShow = false;
			this.finalObj = {
				title: "",
				__title: "",
				from: "",
				__from: "",
				content: "",
				__content: ""
			};
		},
		indexBookClick() {
			this.indexBookShow = false;
			this.bookShow = true;
			this.$nextTick(() => {
				this.nextPage();
				this.curTip = "";
			});
		},
		choose(_index, _optionIndex) {
			this.chooses = this.chooses.map((item, index) => {
				item.options = item.options.map((optionItem, optionIndex) => {
					if (index === _index && optionIndex === _optionIndex) {
						optionItem.choosed = !optionItem.choosed;
						if (optionItem.choosed)
							optionItem.class = "style" + util.random(1, 3);
					}
					return optionItem;
				});
				return item;
			});
			console.log(this.chooses);
		},
		touchHandle(event) {
			if (!this.canTouch) return;
			const eventType = event.type;
			if (event.touches[0]) {
				const { pageX, pageY } = event.touches[0];
				this.currentX = pageX;
				this.currentY = pageY;
				this.isTouchmoveNow = false;
			}
			if (eventType === "touchstart") {
				this.startX = this.currentX;
				this.startY = this.currentY;
				this.hadTouchStart = true;
				this.turnstart();
			} else if (eventType === "touchmove") {
				if (!this.hadTouchStart) return;
				if (this.touchTipShow) this.touchTipShow = false;
				if (this.curTip) this.curTip = "";
				this.isTouchmoveNow = true;
				this.distance = Math.abs(this.currentX - this.startX);
				if (this.currentX < this.startX) {
					this.directionTotal = "left";
					this.direction = this.direction || this.directionTotal;
					this.turning(this.direction, this.directionTotal, this.distance);
				} else if (this.currentX > this.startX) {
					this.directionTotal = "right";
					this.direction = this.direction || this.directionTotal;
					this.turning(this.direction, this.directionTotal, this.distance);
				}
			} else if (eventType === "touchend") {
				if (!this.hadTouchStart) return;
				this.hadTouchStart = false;
				this.endX = this.currentX;
				this.endY = this.currentY;
				this.turnend(this.direction);
				this.direction = null;
				this.isTouchmoveNow = false;
			}
		},
		turnstart() {
			console.log("开始");
			if (this.currentShowPageIndex === PageLength - 1) {
				const el = this.$refs.inputEl;
				if (el) el.blur();
			}
		},
		focusHandle() {
			this.focusing = true;
		},
		blurHandle() {
			this.focusing = false;
			setTimeout(() => {
				!this.focusing && window.scroll(0, 0);
			}, 30);
			setTimeout(() => {
				!this.focusing && window.scroll(0, 0);
			}, 300);
		},
		prevPage() {
			console.log("prevPage");
			if (!this.canTouch) return;
			this.currentTouchPageIndex = this.currentShowPageIndex - 1;
			this.target = this.$refs.book.querySelectorAll(".page")[
				this.currentTouchPageIndex
			];
			if (this.target) {
				this.target.__rotationY = -MaxRotation;
				this.autoTurn("right");
				this.setZIndexs();
			}
			if (this.curTip) this.curTip = "";
			if (this.touchTipShow) this.touchTipShow = false;
		},
		nextPage() {
			console.log("nextPage");
			if (!this.canTouch) return;
			if (this.currentShowPageIndex >= PageLength - 1) return;
			this.currentTouchPageIndex = this.currentShowPageIndex;
			this.target = this.$refs.book.querySelectorAll(".page")[
				this.currentTouchPageIndex
			];
			if (this.target) {
				this.target.__rotationY = 0;
				this.autoTurn("left");
				this.setZIndexs();
			}
			if (this.curTip) this.curTip = "";
			if (this.touchTipShow) this.touchTipShow = false;
		},
		turning(direction, directionTotal, distance) {
			if (!this.canTouch) return;
			if (this.target) {
				// 找到目标开始操作
				let rotationY;
				if (direction === "left" && directionTotal === "left") {
					// 向左翻到下一页
					let rate = util.toFixed(distance / MoveWidth, 5);
					rate = rate > 1 ? 1 : rate;
					rotationY = -MaxRotation * rate;
					if (this.currentTouchPageIndex > PageLength - 2) {
						// 这是最后一页 只能稍微抬起，不能翻页
						rotationY = rotationY < -8 ? -8 : rotationY;
					}
					TweenMax.set(this.target, {
						rotationY: rotationY
					});
					this.setShadow();
				} else if (direction === "right" && directionTotal === "right") {
					let rate = util.toFixed(distance / MoveWidth, 5);
					rate = rate > 1 ? 1 : rate;
					if (this.target.__state === "closed") {
						// 向右翻返回上一页
						rate = 1 - rate;
						rotationY = MaxRotation * rate;
						TweenMax.set(this.target, {
							rotationY: -rotationY
						});
						this.setShadow();
					}
				}
				this.target.__rotationY = rotationY;
			} else {
				// 根据方向找到操作目标
				if (direction === "left") {
					this.currentTouchPageIndex = this.currentShowPageIndex;
					this.target = this.$refs.book.querySelectorAll(".page")[
						this.currentTouchPageIndex
					];
				} else if (direction === "right") {
					this.currentTouchPageIndex = this.currentShowPageIndex - 1;
					this.target = this.$refs.book.querySelectorAll(".page")[
						this.currentTouchPageIndex
					];
				}
				if (this.target) {
					console.log("找到目标: " + this.currentTouchPageIndex);
					this.setZIndexs();
				} else {
					console.log("没有找到目标");
					this.canTouch = true;
				}
			}
		},
		turnend(direction) {
			if (!this.canTouch) return;
			if (this.target) {
				if (direction === "left" && Math.abs(this.target.__rotationY) >= 70) {
					// 向左翻过去
					this.autoTurn(direction);
				} else if (
					direction === "right" &&
					Math.abs(this.target.__rotationY) < 80
				) {
					// 向右翻过去
					this.autoTurn(direction);
				} else {
					// 恢复
					this.autoTurn(direction, true);
				}
			}
		},
		autoTurn(direction, reset) {
			this.canTouch = false;
			if (reset) {
				// 恢复
				if (direction === "left") {
					console.log("向右恢复原状");
					// 一度10ms
					const duration = (Math.abs(this.target.__rotationY) * 10) / 1000;
					const startTime = Date.now();
					TweenMax.to(this.target, duration, {
						rotationY: 0,
						onUpdate: () => {
							this.onUpdate(startTime, duration);
						},
						onComplete: () => {
							this.target = null;
							this.canTouch = true;
							this.shadowOpacity = 0;
							if (this.currentShowPageIndex === PageLength - 1) {
								console.log("最后一个");
								this.$toast("这是最后一页了");
							}
						}
					});
				} else {
					console.log("向左恢复原状");
					// 一度10ms
					const duration =
						((MaxRotation - Math.abs(this.target.__rotationY)) * 10) / 1000;
					const startTime = Date.now();
					// console.log(this.target.__rotationY)
					TweenMax.to(this.target, duration, {
						rotationY: -MaxRotation,
						onUpdate: () => {
							this.onUpdate(startTime, duration, "left");
						},
						onComplete: () => {
							this.target = null;
							this.canTouch = true;
							this.shadowOpacity = 0;
						}
					});
				}
			} else {
				// 翻过去
				if (direction === "left") {
					console.log("向左翻过去");
					// 一度10ms
					const duration =
						((MaxRotation - Math.abs(this.target.__rotationY)) * 10) / 1000;
					const startTime = Date.now();
					TweenMax.to(this.target, duration, {
						rotationY: -MaxRotation,
						onUpdate: () => {
							this.onUpdate(startTime, duration, "left");
						},
						onComplete: () => {
							let showIndex = this.currentShowPageIndex;
							showIndex++;
							if (showIndex > PageLength) {
								showIndex = PageLength - 1;
							}
							this.currentShowPageIndex = showIndex;
							this.target.__state = "closed";
							this.target = null;
							this.canTouch = true;
							this.shadowOpacity = 0;
							this.pageTurned();
						}
					});
				} else {
					console.log("向右翻过去");
					// 一度10ms
					const duration = (Math.abs(this.target.__rotationY) * 10) / 1000;
					const startTime = Date.now();
					TweenMax.to(this.target, duration, {
						rotationY: 0,
						onUpdate: () => {
							this.onUpdate(startTime, duration);
						},
						onComplete: () => {
							let showIndex = this.currentShowPageIndex;
							showIndex--;
							if (showIndex < 0) {
								showIndex = 0;
							}
							this.currentShowPageIndex = showIndex;
							this.target.__state = "";
							this.target = null;
							this.canTouch = true;
							this.shadowOpacity = 0;
							this.pageTurned();
						}
					});
				}
			}
		},
		onUpdate(startTime, duration, direction) {
			let timeRate = (Date.now() - startTime) / (duration * 1000);
			timeRate = timeRate > 1 ? 1 : timeRate;
			const abs = Math.abs(this.target.__rotationY);
			let rotation = 0;
			if (direction === "left") {
				rotation = timeRate * (MaxRotation - abs) + abs;
			} else {
				timeRate = 1 - timeRate;
				rotation = timeRate * abs;
			}
			rotation = Math.floor(rotation);
			this.setShadow(rotation);
		},
		pageTurned() {
			console.log("pageTurned: " + this.currentShowPageIndex);
			if (
				this.currentShowPageIndex === 2 &&
				util.sessionStorage("tip2done") != 1
			) {
				this.curTip = "tip2";
				util.sessionStorage("tip2done", 1);
			}
			if (
				this.currentShowPageIndex === 1 &&
				util.sessionStorage("touchTipDone") != 1
			) {
				setTimeout(() => {
					console.log(this.isTouchmoveNow);
					console.log("setTimeout: " + this.currentShowPageIndex);
					if (this.currentShowPageIndex === 1 && !this.isTouchmoveNow) {
						this.touchTipShow = true;
					}
					util.sessionStorage("touchTipDone", 1);
				}, 500);
			}
			if (this.currentShowPageIndex === PageLength - 1) {
				this.hadToEndPage = true;
			}
		},
		setZIndexs() {
			// PageLength 5
			// 左侧zindex 递增，右侧zindex 递减，中间zindex 最大
			// 1 2 5 2 1
			this.zIndexs = this.zIndexs.map((item, index) => {
				if (this.currentTouchPageIndex >= 0) {
					// 正在翻书
					if (this.currentTouchPageIndex === index) {
						// 当前操作页
						return PageLength;
					} else if (index < this.currentTouchPageIndex) {
						// 左侧页
						return index;
					} else {
						// 右侧页
						return PageLength - index;
					}
				}
			});
		},
		setShadow(rotation) {
			rotation =
				typeof rotation === "number"
					? Math.abs(rotation)
					: Math.abs(this.target.__rotationY);
			if (rotation <= 90) {
				this.shadowOpacity = 1 - rotation / 90;
			} else {
				this.shadowOpacity = 0;
			}
		},
		setFinalWord(options) {
			console.log(options);
			/**
			3个以下选几个呈现几个
			4-7在3-6个这个区间随机呈现
			7个以上最多呈现5-8个
			（这里的多少个指的是关键词文案，不是全部文案）
			 */
			let len = options.length;
			let needLen = 1;
			if (len <= 3) {
				needLen = len;
			} else if (len >= 4 && len <= 7) {
				needLen = util.random(3, len > 6 ? 6 : len);
			} else {
				needLen = util.random(5, len > 8 ? 8 : len);
			}
			const strList = [];
			let stop = false;
			while (stop === false) {
				const des = options[util.random(0, len - 1)].des;
				if (!strList.includes(des)) {
					strList.push(des);
				}
				if (strList.length >= needLen) {
					stop = true;
				}
			}
			const str = strList.join("\n");
			const endStr = endWords[util.random(0, endWords.length - 1)];
			const startStr = startWords[util.random(0, startWords.length - 1)] + "——";
			this.finalObj.__title = "为什么\n我还想爱这个世界";
			this.finalObj.__from = "| " + (this.inputValue || "佚名");
			this.finalObj.__content = startStr + "\n" + str + "\n\n" + endStr;
			console.log(this.finalObj.__content);
			this.finalObj.title = this.finalObj.__title;
		},
		titleEnterHandle(el, done) {
			const text = this.finalObj.title;
			let index = el.getAttribute("data-index");
			const prevStr = text.slice(0, index);
			const brLength = util.getCountIncludes(prevStr, "\n");
			const delay = index * 0.1 + brLength * brDelay + 1.2;
			TweenMax.from(el, 0.8, {
				delay: delay,
				opacity: 0,
				// x: "-100vw",
				// y: "-40vh",
				// rotationZ: util.random(-720, 720),
				// rotationX: util.random(-720, 720),
				// rotationY: util.random(-180, 180),
				// scale: util.random(10, 30) / 10,
				onComplete: () => {
					done();
					if (index == this.finalObj.title.length - 1) {
						console.log("titleEnterHandle done");
						this.finalObj.from = this.finalObj.__from;
						this.bs && this.bs.refresh();
					} else if (index == 0) {
						this.bs && this.bs.refresh();
					}
				}
			});
		},
		nicknameEnterHandle(el, done) {
			const text = this.finalObj.from;
			let index = el.getAttribute("data-index");
			const prevStr = text.slice(0, index);
			const brLength = util.getCountIncludes(prevStr, "\n");
			const delay = index * 0.1 + brLength * brDelay;
			TweenMax.from(el, 0.8, {
				delay: delay,
				opacity: 0,
				// x: "-100vw",
				// y: "-40vh",
				// rotationZ: util.random(-720, 720),
				// rotationX: util.random(-720, 720),
				// rotationY: util.random(-180, 180),
				// scale: util.random(10, 30) / 10,
				onComplete: () => {
					done();
					if (index == this.finalObj.from.length - 1) {
						console.log("nicknameEnterHandle done");
						this.finalObj.content = this.finalObj.__content;
						this.bs && this.bs.refresh();
					} else if (index == 0) {
						this.bs && this.bs.refresh();
					}
				}
			});
		},
		wordsEnterHandle(el, done) {
			const text = this.finalObj.content;
			let index = el.getAttribute("data-index");
			const prevStr = text.slice(0, index);
			const brLength = util.getCountIncludes(prevStr, "\n");
			const delay = index * 0.1 + brLength * brDelay;
			TweenMax.from(el, 0.8, {
				delay: delay,
				opacity: 0,
				// x: "-100vw",
				// y: "-40vh",
				// rotationZ: util.random(-720, 720),
				// rotationX: util.random(-720, 720),
				// rotationY: util.random(-180, 180),
				// scale: util.random(10, 30) / 10,
				onComplete: () => {
					done();
					if (index == this.finalObj.content.length - 1) {
						console.log("wordsEnterHandle done");
						this.shot();
						this.bs && this.bs.refresh();
					} else if (index == 0) {
						this.bs && this.bs.refresh();
					}
				}
			});
		},
		shot() {
			const myFun = () => {
				console.log("shot");
				var node = this.$refs.screenshot; //需要截图的包裹的（原生的）DOM 对象
				var width = node.offsetWidth; //获取dom 宽度
				var height = node.offsetHeight; //获取dom 高度
				var canvas = document.createElement("canvas"); //创建一个canvas节点
				var scale = 750 / node.offsetWidth; //定义任意放大倍数 支持小数 定义截图后图片宽度
				canvas.width = width * scale; //定义canvas 宽度 * 缩放
				canvas.height = height * scale; //定义canvas高度 *缩放
				const context = canvas.getContext("2d"); //获取context
				context.scale(scale, scale); //设置scale
				var opts = {
					scale: scale, // 添加的scale 参数
					canvas: canvas, //自定义 canvas
					// logging: true, //日志开关，便于查看html2canvas的内部执行流程
					width: width, //dom 原始宽度
					height: height,
					useCORS: true // 【重要】开启跨域配置
				};

				html2canvas(node, opts).then(canvas => {
					this.baseData = canvas.toDataURL();
					this.saveImgShow = true;
					this.imgShow = true;
					this.backBtnShow = true;
				});
			};

			this.$nextTick(() => {
				setTimeout(() => {
					myFun();
				}, 300);
			});
		}
	}
};
</script>

<style lang="scss" scoped>
@import "../common/mixin.scss";

#container {
	height: 100vh;
	width: 100vw;
	position: fixed;
	left: 0;
	top: 50%;
	transform: translate3D(0, -50%, 0);
	transform-style: preserve-3d;
	-webkit-overflow-scrolling: touch;
	overflow-x: hidden;
	overflow-y: auto;
	background-color: #fff;

	#box {
		@include bgImg-width-cdnPath("../../public/img/bg.jpg");
		background-color: rgba(50, 52, 61, 1);
		background-size: cover;
		height: 100vh;
		max-height: 200vw;
		width: 100vw;
		min-height: 160vw;
		position: relative;

		&.final {
			@include bgImg-width-cdnPath("../../public/img/final_long.jpg");
			overflow: hidden;
			height: 100%;
			min-height: unset;
		}

		#content {
			height: 160vw;
			width: 100%;
			position: absolute;
			z-index: 1;
			left: 0;
			top: 50%;
			transform: translateY(-50%);

			.submitBtn {
				position: absolute;
				bottom: 6.4vw;
				left: 36vw;
				width: 28vw;
				height: 8.27vw;
				border-radius: 4.13vw;
				border: 0.3vw solid rgba(255, 255, 255, 1);
				z-index: -1;

				&::after {
					content: attr(data-value);
					@include bgImg-width-cdnPath("../../public/img/right.jpg");
					border-radius: 4.13vw;
					display: inline-block;
					width: 100%;
					height: 100%;
					font-size: 4.13vw;
					font-family: STSongti-SC-Bold, STSongti-SC;
					font-weight: bold;
					color: rgba(0, 0, 0, 1);
					line-height: 7vw;
					text-align: center;
					position: absolute;
					left: 0;
					top: 0;
					transform: translateY(-0.6vw);
					transition: transform 100ms;
				}

				&:active {
					transform: none;

					&::after {
						transform: none;
					}
				}
			}

			.prevBtn,
			.nextBtn {
				position: absolute;
				bottom: 6.4vw;
				z-index: -1;
				width: 8.13vw;
				height: 8.4vw;

				&.disabled {
					opacity: 0.5;
				}
			}
			.prevBtn {
				@include bgImg-width-cdnPath("../../public/img/pagePrev.png");
				left: 14.53vw;
			}
			.nextBtn {
				@include bgImg-width-cdnPath("../../public/img/pageNext.png");
				right: 14.53vw;
			}

			.indexBook {
				@include bgImg-width-cdnPath("../../public/img/indexbook.png");
				width: 88vw;
				height: 135vw;
				position: absolute;
				left: 6vw;
				top: 7vw;

				.title {
					width: 33.33vw;
					height: 60.67vw;
					position: absolute;
					left: 25.335vw;
					top: 23vw;
					font-size: 7.33vw;
					font-family: STSongti-SC-Black, STSongti-SC;
					font-weight: 900;
					color: rgba(42, 53, 87, 1);
					line-height: 9.87vw;
					letter-spacing: 2vw;
					padding-left: 3vw;
					white-space: nowrap;
					padding-top: 7vw;
				}

				.from {
					font-size: 4vw;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: rgba(33, 37, 52, 0.7);
					line-height: 5.6vw;
					position: absolute;
					width: 100%;
					left: 0;
					bottom: 13vw;
					text-align: center;
					transform: scale(0.7);
				}
			}

			.tipCircle {
				position: absolute;
				top: 116vw;
				left: 63.6vw;
				z-index: 2;
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 14.13vw;
				height: 14.13vw;
				overflow: visible;
				pointer-events: none;

				.circle {
					@include bgImg-width-cdnPath("../../public/img/tipCircle.png");
					width: 14.13vw;
					height: 14.13vw;
					display: inline-block;
					flex-shrink: 0;
					animation-delay: 1s;
					animation-name: circle_ani;
					animation-duration: 2s;
					animation-iteration-count: infinite;
					@include keyframes(circle_ani) {
						0%,
						100% {
							opacity: 1;
						}
						50% {
							opacity: 0.5;
						}
					}
				}
				.line {
					@include bgImg-width-cdnPath("../../public/img/tipLine.png");
					width: 0.4vw;
					height: 10.4vw;
					display: inline-block;
					margin-top: -1vw;
					flex-shrink: 0;
				}
				.word {
					font-size: 4.4vw;
					font-family: STSongti-SC-Bold, STSongti-SC;
					font-weight: bold;
					color: rgba(255, 255, 255, 1);
					line-height: 6.13vw;
					letter-spacing: 1px;
					flex-shrink: 0;
					white-space: nowrap;
				}
			}
		}

		.touchTip {
			@include bgImg-width-cdnPath("../../public/img/touchTip.png");
			background-color: rgba(11, 16, 22, 0.6);
			background-size: 38.67vw auto;
			position: absolute;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
			z-index: 11;
			pointer-events: none;
		}

		#final_content_box {
			position: absolute;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
			// overflow-x: hidden;
			// overflow-y: auto;
			overflow: hidden;
			// display: flex;
			// flex-direction: column;
			// justify-content: center;
			// align-items: center;

			#final_content {
				position: relative;
				min-height: 160vw;
				width: 100%;
				padding: 21.47vw 0 25vw 17.33vw;

				.final_title {
					font-size: 6.67vw;
					font-family: STSongti-SC-Black, STSongti-SC;
					font-weight: 900;
					color: rgba(0, 0, 0, 1);
					line-height: 11.47vw;
				}

				.final_nickname {
					font-size: 5.47vw;
					font-family: STSongti-SC-Regular, STSongti-SC;
					font-weight: 400;
					color: rgba(0, 0, 0, 1);
					line-height: 4vw;
					margin-top: 14.67vw;
				}

				.final_words {
					font-size: 4.13vw;
					font-family: STSongti-SC-Regular, STSongti-SC;
					font-weight: 400;
					color: rgba(0, 0, 0, 1);
					line-height: 10.67vw;
					margin-top: 16vw;
				}

				.saveImgTip {
					@include bgImg-width-cdnPath("../../public/img/saveImgTip.png");
					width: 20.27vw;
					height: 5vw;
					display: inline-block;
					position: absolute;
					bottom: 9vw;
					left: 39.865vw;
					animation-name: saveImgTip_ani;
					animation-duration: 1.5s;
					animation-iteration-count: infinite;
					@include keyframes(saveImgTip_ani) {
						0%,
						100% {
							transform: translateY(0);
						}
						50% {
							transform: translateY(-1vw);
						}
					}
				}
			}

			.backBtn {
				@include bgImg-width-cdnPath("../../public/img/backBtn.png");
				background-size: auto 4vw;
				position: absolute;
				width: 10vw;
				height: 10vw;
				left: 5vw;
				top: 7vw;
				z-index: 12;
			}
		}

		.TheImg {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			opacity: 0.01;
			z-index: 10;

			&.longpress {
				-webkit-touch-callout: none;
				-ms-touch-callout: none;
				-moz-touch-callout: none;
			}
		}
	}
}

#book {
	width: 84vw;
	height: 128vw;
	position: absolute;
	left: 8vw;
	top: 10vw;
	perspective: 1200px;
	border-radius: 0 8vw 8vw 0;
	box-shadow: 2vw 2vw 10vw 0 #000;
	transform: translate3D(0, 0, 0);
	transform-style: preserve-3d;

	.page {
		position: absolute;
		width: 100%;
		height: 100%;
		transform: translate3D(0, 0, 0);
		transform-origin: left;
		transform-style: preserve-3d;
		border-radius: 0 8vw 8vw 0;
		backface-visibility: hidden;

		.shadow {
			position: absolute;
			left: 0;
			top: 0;
			height: 100%;
			width: 100%;
			z-index: 3;
			background-color: rgba(0, 0, 0, 0.8);
			border-radius: 0 8vw 8vw 0;
			pointer-events: none;
		}
		.front {
			@include bgImg-width-cdnPath("../../public/img/right.jpg");
			background-size: cover;
			position: absolute;
			left: 0;
			top: 0;
			height: 100%;
			width: 100%;
			z-index: 2;
			backface-visibility: hidden;
			transform-style: preserve-3d;
			border-radius: 0 8vw 8vw 0;

			.pagenum {
				font-size: 3.73vw;
				font-family: STSongti-SC-Regular, STSongti-SC;
				font-weight: 400;
				color: rgba(57, 57, 57, 1);
				line-height: 1;
				position: absolute;
				bottom: 3vw;
				left: 50%;
				transform: translateX(-50%);
			}
		}
		.back {
			@include bgImg-width-cdnPath("../../public/img/left.jpg");
			background-size: cover;
			position: absolute;
			left: 0;
			top: 0;
			height: 100%;
			width: 100%;
			z-index: 1;
			border-radius: 8vw 0 0 8vw;
			backface-visibility: hidden;
			transform: rotateY(180deg) translate3D(0, 0, 0);
			transform-style: preserve-3d;

			.back__shadow {
				position: absolute;
				width: 100%;
				height: 100%;
				left: 0;
				top: 0;
				background: rgba(51, 51, 51, 0.18);
				pointer-events: none;
			}
		}
	}

	.page:nth-child(1) {
		.front {
			@include bgImg-width-cdnPath("../../public/img/cover.jpg");
		}
	}
}

#book {
	.cover {
		width: 100%;
		height: 100%;

		.title {
			@include bgImg-width-cdnPath("../../public/img/title_bg.png");
			width: 33.33vw;
			height: 60.67vw;
			position: absolute;
			left: 25.335vw;
			top: 19.2vw;
			font-size: 7.33vw;
			font-family: STSongti-SC-Black, STSongti-SC;
			font-weight: 900;
			color: rgba(42, 53, 87, 1);
			line-height: 9.87vw;
			letter-spacing: 2vw;
			padding-left: 3vw;
			white-space: nowrap;
			padding-top: 7vw;
		}

		.from {
			font-size: 4vw;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: rgba(33, 37, 52, 0.7);
			line-height: 5.6vw;
			position: absolute;
			width: 100%;
			left: 0;
			bottom: 10vw;
			text-align: center;
			transform: scale(0.7);
		}
	}
	.foreword {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;

		.foreword_title {
			font-size: 4.27vw;
			font-family: STSongti-SC-Regular, STSongti-SC;
			font-weight: bold;
			color: rgba(0, 0, 0, 1);
			line-height: 6vw;
			display: inline-block;
			margin-bottom: 7.6vw;
			margin-left: 5vw;

			&::before,
			&::after {
				content: "";
				display: inline-block;
				width: 0.93vw;
				height: 0.93vw;
				background: rgba(0, 0, 0, 1);
				margin: 0 3.87vw;
				vertical-align: middle;
				border-radius: 50%;
			}
		}
		.foreword_content {
			font-size: 3.73vw;
			font-family: STSongti-SC-Regular, STSongti-SC;
			color: rgba(0, 0, 0, 1);
			line-height: 8vw;
			letter-spacing: 1px;
			padding-left: 8vw;
		}
	}
	.directory {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;

		.directory_title {
			font-size: 4.27vw;
			font-family: STSongti-SC-Regular, STSongti-SC;
			font-weight: bold;
			color: rgba(0, 0, 0, 1);
			line-height: 6vw;
			display: inline-block;
			margin-bottom: 9.73vw;
			margin-left: 10.5vw;

			&::before,
			&::after {
				content: "";
				display: inline-block;
				width: 0.93vw;
				height: 0.93vw;
				background: rgba(0, 0, 0, 1);
				vertical-align: middle;
				border-radius: 50%;
			}

			&::before {
				margin-right: 7.87vw;
			}
			&::after {
				margin-left: 7.87vw;
			}
		}
		.directory_list {
			font-size: 3.73vw;
			font-family: STSongti-SC-Regular, STSongti-SC;
			font-weight: 400;
			color: rgba(0, 0, 0, 1);
			line-height: 3.73vw;
			letter-spacing: 1px;
			padding-left: 10.5vw;

			li {
				margin-bottom: 5.6vw;

				.name {
					display: inline-block;
					min-width: 23vw;
					vertical-align: middle;
				}
				.line {
					display: inline-block;
					width: 34.67vw;
					height: 0;
					border-top: 0.3vw dashed rgba(151, 151, 151, 1);
					margin-right: 1.87vw;
					vertical-align: middle;
				}
				.num {
					display: inline-block;
					vertical-align: middle;
				}
			}
		}
	}
	.choose {
		height: 100%;
		width: 100%;
		overflow: hidden;

		.choose_title {
			font-size: 5.33vw;
			font-family: STSongti-SC-Bold, STSongti-SC;
			font-weight: bold;
			color: rgba(0, 0, 0, 1);
			line-height: 6.67vw;
			padding: 15vw 0 0 10vw;
			display: inline-flex;
			flex-direction: column;
			align-items: center;

			&::before {
				content: "";
				display: inline-block;
				width: 1vw;
				height: 1vw;
				background: rgba(42, 53, 87, 1);
				border-radius: 50%;
				margin-bottom: 1.48vw;
				margin-left: 0.5vw;
			}
			&::after {
				content: "";
				display: inline-block;
				width: 0;
				height: 42.13vw;
				border-left: 0.55vw dashed rgba(0, 0, 0, 0.5);
				margin-top: 3vw;
			}
		}
		.choose_options {
			font-size: 4vw;
			font-family: STSongti-SC-Regular, STSongti-SC;
			color: rgba(0, 0, 0, 1);
			line-height: 1.3;

			.choose_options_item {
				position: absolute;
				display: inline-flex;
				text-align: center;
				transform: translate(-50%, -50%);

				.text {
					text-align: center;
					display: inline-flex;
					flex-direction: column;
					flex-wrap: nowrap;
					padding: 3vw;
				}

				.choosed {
					display: inline-block;
					position: absolute;
					width: 100%;
					height: 100%;
					left: 50%;
					top: 50%;
					padding: 12vw;
					transform: translate(-50%, -50%);
					pointer-events: none;

					&.style1 {
						@include bgImg-width-cdnPath("../../public/img/choosed_1.png");
					}
					&.style2 {
						@include bgImg-width-cdnPath("../../public/img/choosed_2.png");
					}
					&.style3 {
						@include bgImg-width-cdnPath("../../public/img/choosed_3.png");
					}
				}
			}
		}
	}
	.input {
		height: 100%;
		width: 100%;
		text-align: center;

		.input_title {
			font-size: 4.27vw;
			font-family: STSongti-SC-Bold, STSongti-SC;
			font-weight: bold;
			color: rgba(0, 0, 0, 1);
			line-height: 6vw;
			display: inline-block;
			margin: 40vw auto 15vw;

			&::before,
			&::after {
				content: "";
				display: inline-block;
				width: 0.93vw;
				height: 0.93vw;
				background: rgba(0, 0, 0, 1);
				margin: 0 3.87vw;
				vertical-align: middle;
				border-radius: 50%;
			}
		}

		.input_el {
			text-align: center;
			background: transparent;
			border: none;
			border-bottom: 0.3vw solid rgba(42, 53, 87, 1);
			padding: 1vw 5vw;
			font-size: 4.2vw;
			line-height: 1.2;
			caret-color: rgba(0, 0, 0, 0.6);
			border-radius: 0;
			font-family: STSongti-SC-Regular, STSongti-SC;
			width: 41.87vw;
		}

		> .business {
			font-size: 3vw;
			color: black;
			line-height: 6.13vw;
			white-space: nowrap;
			font-family: STSongti-SC-Bold, STSongti-SC;
			position: absolute;
			// bottom: 8vw;
			bottom: 5.2vw;
			left: 50%;
			transform: translateX(-50%);
			display: inline-block;
		}
	}
}

#screenshot {
	width: 100vw;
	min-height: 177.87vw;
	position: fixed;
	z-index: 10;
	overflow: hidden;
	bottom: 0;
	left: 200vw;
	// top: 0;
	// left: 0;
	background-color: #e7e4df;
	padding: 22.13vw 0 60vw 17.33vw;

	.screenshot_bg {
		position: absolute;
		left: 0;
		top: 0;
		width: 100vw;
		height: 232vw;
		z-index: -1;
	}

	.screenshot_bg2 {
		position: absolute;
		left: 0;
		top: 232vw;
		width: 100vw;
		height: 232vw;
		z-index: -1;
	}

	.qrbox {
		position: absolute;
		width: 18.67vw;
		bottom: 14vw;
		left: 40.67vw;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;

		.qrcode {
			width: 18.67vw;
			height: 18.67vw;
			display: block;
		}
		.qrtext,
		.business {
			font-size: 4.54vw;
			font-family: STSongti-SC-Bold, STSongti-SC;
			font-weight: bold;
			color: rgba(0, 0, 0, 1);
			line-height: 0.8;
			letter-spacing: 3px;
			transform: scale(0.5);
			display: inline-block;
			white-space: nowrap;
			text-indent: 3px;
		}
	}

	.final_title {
		font-size: 6.67vw;
		font-family: STSongti-SC-Black, STSongti-SC;
		font-weight: 900;
		color: rgba(0, 0, 0, 1);
		line-height: 11.47vw;
	}

	.final_nickname {
		font-size: 5.47vw;
		font-family: STSongti-SC-Regular, STSongti-SC;
		font-weight: 400;
		color: rgba(0, 0, 0, 1);
		line-height: 4vw;
		margin-top: 14.67vw;
	}

	.final_words {
		font-size: 4.13vw;
		font-family: STSongti-SC-Regular, STSongti-SC;
		font-weight: 400;
		color: rgba(0, 0, 0, 1);
		line-height: 10.67vw;
		margin-top: 16vw;
	}
}
</style>
