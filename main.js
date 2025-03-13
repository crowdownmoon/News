// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 移动端菜单切换
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // 加载内容模块
    loadContentModules();

    // 平滑滚动处理
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // 如果是移动端，点击后关闭菜单
                if (window.innerWidth < 768) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
});

// 加载内容模块
function loadContentModules() {
    const contentContainer = document.getElementById('contentContainer');
    if (!contentContainer) return;

    // 定义内容模块
    const modules = [
        { id: 'intro', file: 'content/intro.html', title: 'Claude 3.7简介：AI领域的革命性突破' },
        { id: 'tech', file: 'content/tech.html', title: '核心技术创新：混合推理引擎' },
        { id: 'dev', file: 'content/dev.html', title: '开发者指南：如何利用Claude 3.7提升编程效率' },
        { id: 'design', file: 'content/design.html', title: '设计师指南：Claude 3.7在UI/UX设计中的应用' },
        { id: 'content', file: 'content/content.html', title: '内容创作者指南：用Claude 3.7提升创作质量' },
        { id: 'prompt', file: 'content/prompt.html', title: '提示词工程：撰写高效Claude 3.7提示的最佳实践' },
        { id: 'cases', file: 'content/cases.html', title: '实际应用案例分析' },
        { id: 'limits', file: 'content/limits.html', title: 'Claude 3.7的局限性与未来展望' },
        { id: 'faq', file: 'content/faq.html', title: '常见问题解答' }
    ];

    // 创建内容区域
    modules.forEach(module => {
        // 创建模块容器
        const section = document.createElement('section');
        section.id = module.id;
        section.className = 'content-section';
        
        // 创建标题
        const heading = document.createElement('h2');
        heading.className = 'text-3xl font-bold mb-6 text-purple-800 border-b-2 border-purple-200 pb-2';
        heading.textContent = module.title;
        
        // 创建内容框架
        const content = document.createElement('div');
        content.className = 'content-body';
        
        // 使用iframe加载内容
        const iframe = document.createElement('iframe');
        iframe.src = module.file;
        iframe.className = 'w-full border-none';
        iframe.style.minHeight = '500px'; // 设置最小高度
        iframe.onload = function() {
            // 调整iframe高度以适应内容
            this.style.height = this.contentWindow.document.body.scrollHeight + 'px';
        };
        
        // 添加到内容区域
        content.appendChild(iframe);
        section.appendChild(heading);
        section.appendChild(content);
        contentContainer.appendChild(section);
    });

    // 添加返回顶部按钮
    const backToTop = document.createElement('div');
    backToTop.className = 'fixed bottom-6 right-6 bg-purple-700 text-white p-3 rounded-full shadow-lg cursor-pointer opacity-0 transition-opacity duration-300';
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    document.body.appendChild(backToTop);

    // 监听滚动，显示/隐藏返回顶部按钮
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.remove('opacity-0');
            backToTop.classList.add('opacity-100');
        } else {
            backToTop.classList.remove('opacity-100');
            backToTop.classList.add('opacity-0');
        }
    });
}

// 创建目录
function createTableOfContents() {
    const toc = document.getElementById('tableOfContents');
    if (!toc) return;

    const headings = document.querySelectorAll('h2, h3');
    const tocList = document.createElement('ul');
    tocList.className = 'space-y-2';

    headings.forEach(heading => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        
        // 设置链接样式和目标
        link.href = `#${heading.id}`;
        link.textContent = heading.textContent;
        
        // 根据标题级别设置缩进
        if (heading.tagName === 'H3') {
            listItem.className = 'ml-4';
            link.className = 'text-purple-600 hover:text-purple-800 transition';
        } else {
            link.className = 'font-semibold text-purple-800 hover:text-purple-900 transition';
        }
        
        listItem.appendChild(link);
        tocList.appendChild(listItem);
    });

    toc.appendChild(tocList);
} 