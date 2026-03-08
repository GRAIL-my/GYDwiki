// 工具函数：判断元素是否在视口
function isElementInView(el) {
    const rect = el.getBoundingClientRect();
    // 优化触发阈值，适配不同屏幕
    return rect.top < window.innerHeight - 100 && rect.bottom > 50;
}

// 工具函数：重置元素样式（取消所有动画/位移）
function resetElementStyle(el) {
    if (!el) return;
    el.style.opacity = '';
    el.style.transform = '';
    el.style.transition = '';
    el.style.animation = '';
    el.style.visibility = '';
}

// what
const animationConfigs = [
    {
        selector: '.what',
        animate: (el) => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        },
        reset: (el) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px)';
        }
    },
// 2. htu区域：Giraffe+htutbg左→右划入 → htut1淡入 → htut2淡入
    {
        selector: '.htu',
        animate: async (el) => {
            const giraffe = el.querySelector('.giraffe');
            const htutbg = el.querySelector('.htutbg');
            const htut1 = el.querySelector('.htut1');
            const htut2 = el.querySelector('.htut2');

            [giraffe, htutbg].forEach(item => {
                if (item) {
                    item.style.transform = 'translateX(0)';
                    item.style.opacity = '1';
                    item.style.transition = 'transform 0.8s ease, opacity 0.8s ease';
                }
            });

            await new Promise(resolve => setTimeout(resolve, 600));
            if (htut1) {
                htut1.style.opacity = '1';
                htut1.style.transition = 'opacity 0.6s ease';
            }

      
            await new Promise(resolve => setTimeout(resolve, 600));
            if (htut2) {
                htut2.style.opacity = '1';
                htut2.style.transition = 'opacity 0.6s ease';
            }
        },
        reset: (el) => {
            const giraffe = el.querySelector('.giraffe');
            const htutbg = el.querySelector('.htutbg');
            const htut1 = el.querySelector('.htut1');
            const htut2 = el.querySelector('.htut2');

            [giraffe, htutbg].forEach(item => {
                if (item) {
                    item.style.opacity = '0';
                    item.style.transform = 'translateX(-100px)';
                }
            });
            if (htut1) htut1.style.opacity = '0';
            if (htut2) htut2.style.opacity = '0';
        }
    },
    // 3. dam区域：damt → damcleadin → damc1/damc2/damc3/damc4（从下到上）
    {
        selector: '.damt',
        animate: async (el) => {
            const damcleadin = document.querySelector('.damcleadin');
            const damcList = [
                document.querySelector('.damc1'),
                document.querySelector('.damc2'),
                document.querySelector('.damc3'),
                document.querySelector('.damc4')
            ];

            el.style.opacity = '1';
            el.style.transition = 'opacity 0.6s ease';

            await new Promise(resolve => setTimeout(resolve, 500));
            if (damcleadin) {
                damcleadin.style.opacity = '1';
                damcleadin.style.transition = 'opacity 0.6s ease';
            }

            for (let i = 0; i < damcList.length; i++) {
                const damc = damcList[i];
                if (!damc) continue;
                await new Promise(resolve => setTimeout(resolve, 300));
                damc.style.opacity = '1';
                damc.style.transform = 'translateY(0)';
                damc.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            }
        },
        reset: (el) => {
            const damcleadin = document.querySelector('.damcleadin');
            const damcList = [
                document.querySelector('.damc1'),
                document.querySelector('.damc2'),
                document.querySelector('.damc3'),
                document.querySelector('.damc4')
            ];

            el.style.opacity = '0';
            if (damcleadin) damcleadin.style.opacity = '0';

            damcList.forEach(damc => {
                if (damc) {
                    damc.style.opacity = '0';
                    damc.style.transform = 'translateY(80px)';
                }
            });
        }
    },
    // 4. output区域：opt左→右 + opc右→左 → film淡入
    {
        selector: '.output',
        animate: async (el) => {
            const opt = el.querySelector('.opt');
            const opc = el.querySelector('.opc');
            const opcp = document.querySelector('.opcp');

            if (opt) {
                opt.style.transform = 'translateX(0)';
                opt.style.opacity = '1';
                opt.style.transition = 'transform 0.8s ease, opacity 0.8s ease';
            }
            if (opc) {
                opc.style.transform = 'translateX(0)';
                opc.style.opacity = '1';
                opc.style.transition = 'transform 0.8s ease, opacity 0.8s ease';
            }

            await new Promise(resolve => setTimeout(resolve, 800));
            if (opcp) {
                opcp.style.opacity = '1';
                opcp.style.transition = 'opacity 1s ease';
            }
        },
        reset: (el) => {
            const opt = el.querySelector('.opt');
            const opc = el.querySelector('.opc');
            const opcp = document.querySelector('.opcp');

            if (opt) {
                opt.style.opacity = '0';
                opt.style.transform = 'translateX(-100px)';
            }
        
            if (opc) {
                opc.style.opacity = '0';
                opc.style.transform = 'translateX(100px)';
            }
            if (opcp) opcp.style.opacity = '0';
        }
    }
];


function initAnimation() {
    animationConfigs.forEach(config => {
        const el = document.querySelector(config.selector);
        if (el) config.reset(el);
    });
}


function handleScroll() {
    animationConfigs.forEach(config => {
        const el = document.querySelector(config.selector);
        if (!el) return;

        if (isElementInView(el)) {
            config.animate(el); 
        } else {
            config.reset(el);   
        }
    });


    document.querySelectorAll('.damt, .opt, .damc1, .damc2, .damc3, .damc4').forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.style.animationPlayState = 'paused';
            el.style.transform = 'scale(1.05)';
            el.style.transition = 'transform 0.3s ease';
        });
        el.addEventListener('mouseleave', () => {
            el.style.animationPlayState = 'running';
            el.style.transform = '';
            el.style.transition = '';
        });
    });
}


window.addEventListener('load', () => {
    initAnimation();
    window.addEventListener('scroll', handleScroll);
    handleScroll();
});