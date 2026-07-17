---
name: "cydatatft-portfolio"
description: "更新 cydatatft 作品集网站并推送到 GitHub Pages。当用户需要修改网站内容、更新文案、修复样式、替换截图，或要求将改动部署到线上时调用。"
---

# cydatatft 作品集网站更新

## 项目信息

| 项目 | 详情 |
|------|------|
| 软件名称 | cydatatft |
| 线上地址 | https://cyarc12.github.io/cydatatft-portfolio |
| GitHub 仓库 | https://github.com/cyarc12/cydatatft-portfolio |
| 本地路径 | `C:\Users\Acer\AppData\Roaming\TRAE SOLO CN\ModularData\ai-agent\work-mode-projects\6a59f1c1e97293464f80d6f4` |
| Git 用户 | cyarc12 / 1430629577@qq.com |
| Git 分支 | main |

## 文件结构

```
├── index.html          # 页面结构（导航、Hero、成果、功能、开发流程、迭代、下载、联系方式）
├── style.css           # 所有样式（深色科技风，CSS变量系统）
├── script.js           # 交互逻辑（滚动动画、标签切换、数字计数、移动端导航）
├── assets/
│   ├── screenshot-homepage.jpg      # 应用主页 (1080×6013)
│   ├── screenshot-team-rec.jpg      # 阵容推荐 (1080×6949)
│   ├── screenshot-hero-detail.jpg   # 英雄详情 (1080×6532)
│   ├── screenshot-team-detail.jpg   # 阵容详情 (1080×6377)
│   ├── screenshot-equip-tier.jpg    # 装备评级 (1080×3668)
│   └── screenshot-star-god.jpg      # 其他信息 (1080×4238)
└── .trae/skills/cydatatft-portfolio/SKILL.md  # 本文件
```

## 页面结构（8个区块）

1. **Hero** - 首屏：标签、标题、副标题、下载按钮、手机模型
2. **Stats** - 项目成果：4 张卡片（赛季数据支持、核心资料模块、核心技术难点、可发布产品）
3. **Features** - 功能展示：6 个标签页切换（应用主页、阵容推荐、英雄详情、阵容详情、装备评级、其他信息）
4. **Workflow** - 开发流程：5 个步骤（需求拆解、数据建模、页面实现、实机调试、打包发布）
5. **Timeline** - 版本迭代：V1-V5 时间线
6. **Download** - APK 下载区域
7. **Contact** - 联系方式（手机、邮箱、GitHub）
8. **Footer** - 页脚

## 关键设计约定

- **设计风格**：深色科技感，深灰背景 + 低饱和金色/蓝紫色强调色
- **CSS 变量**：定义在 `style.css` 的 `:root` 中，所有颜色通过变量引用
- **手机模型**：长图通过 `overflow: hidden` + hover 时 `overflow-y: auto` 实现滚动查看
- **标签切换**：`script.js` 中 `featureData` 对象控制 6 个标签的内容，切换时自动重置滚动位置
- **响应式**：三个断点 — 1024px（大屏）、768px（平板）、480px（手机）
- **文案风格**：产品化、可验证，避免"一键生成""高效上分"等表达，强调数据结构、查询场景、产品能力

## 更新与部署流程

### 修改文件

直接编辑 `index.html`、`style.css`、`script.js` 或替换 `assets/` 中的图片。

### 提交并推送

```powershell
cd 'C:\Users\Acer\AppData\Roaming\TRAE SOLO CN\ModularData\ai-agent\work-mode-projects\6a59f1c1e97293464f80d6f4'
git add .
git commit -m "描述本次改动的信息"
git push
```

Git 用户信息已配置（如果未配置则执行）：
```powershell
git config user.email "1430629577@qq.com"
git config user.name "cyarc12"
```

### 生效

推送后 GitHub Pages 自动部署，1-2 分钟内更新到 https://cyarc12.github.io/cydatatft-portfolio。

## 本地预览

```powershell
cd 'C:\Users\Acer\AppData\Roaming\TRAE SOLO CN\ModularData\ai-agent\work-mode-projects\6a59f1c1e97293464f80d6f4'
python -m http.server 8080
```

然后访问 http://localhost:8080。

## 注意事项

- 手机模型中的图片是长图（3600-7000px 高），CSS 使用 `height: auto` + `overflow` 滚动，不要用 `object-fit: cover`
- 修改 `featureData` 时需同时更新 `index.html` 中的初始内容（`feature-badge`、`featureTitle`、`featureDesc`、`feature-list`）
- 响应式断点中的手机模型尺寸需与主样式保持一致
- 页脚版权信息需与软件名称 `cydatatft` 保持一致