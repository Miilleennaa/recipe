document.addEventListener('DOMContentLoaded', () => {
    // Фильтрация по категориям
    const categoryCards = document.querySelectorAll('.category-card');
    const allTipCards = Array.from(document.querySelectorAll('.tip-card'));
    const tipsGrid = document.querySelector('.tips-grid');
    let isAnimating = false; 
    
    // Активация карточки "Все советы" по умолчанию
    const allCategoryCard = document.querySelector('.category-card[data-category="all"]');
    if (allCategoryCard) {
        allCategoryCard.classList.add('active');
    }
    
    // Функция для плавной фильтрации карточек
    function filterCards(category) {
        if (isAnimating) return;
        isAnimating = true;
        
        // Удаление активного класса со всех категорий
        categoryCards.forEach(c => c.classList.remove('active'));
        
        // Добавление активного класса выбранной категории
        const activeCard = document.querySelector(`.category-card[data-category="${category}"]`);
        if (activeCard) {
            activeCard.classList.add('active');
        }
        
        hideNoResultsMessage();
        
        const cardsToHide = [];
        const cardsToShow = [];
        
        allTipCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const shouldShow = category === 'all' || cardCategory === category;
            
            if (shouldShow) {
                cardsToShow.push(card);
            } else {
                cardsToHide.push(card);
            }
        });
        
        // Если нет карточек для показа
        if (cardsToShow.length === 0) {
            allTipCards.forEach(card => {
                card.classList.add('hiding');
            });
            
            setTimeout(() => {
                allTipCards.forEach(card => {
                    card.classList.add('hidden');
                    card.classList.remove('hiding');
                });
                showNoResultsMessage();
                updateCardCount(category, 0);
                isAnimating = false;
            }, 400);
            return;
        }
        
        cardsToHide.forEach(card => {
            card.classList.add('hiding');
        });
        
        setTimeout(() => {
            cardsToHide.forEach(card => {
                card.classList.add('hidden');
                card.classList.remove('hiding');
            });
            
            cardsToShow.forEach(card => {
                if (card.classList.contains('hidden')) {
                    card.classList.remove('hidden');
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                }
            });
            
            void tipsGrid.offsetWidth;
            
            setTimeout(() => {
                cardsToShow.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('showing');
                        card.style.animationDelay = `${index * 0.05}s`;
                    }, 10);
                });
                
                setTimeout(() => {
                    cardsToShow.forEach(card => {
                        card.classList.remove('showing');
                        card.style.animationDelay = '';
                        card.style.opacity = '';
                        card.style.transform = '';
                    });
                    
                    updateCardCount(category, cardsToShow.length);
                    isAnimating = false;
                }, 500 + (cardsToShow.length * 50));
            }, 50);
        }, 400);
    }
    
    // Функция для показа сообщения "Нет результатов"
    function showNoResultsMessage() {
        const existingMessage = tipsGrid.querySelector('.no-results-message');
        if (existingMessage) {
            existingMessage.classList.add('show');
            return;
        }
        
        const message = document.createElement('div');
        message.className = 'no-results-message';
        message.innerHTML = `
            <div class="no-results-content">
                <i class="fas fa-search"></i>
                <h3>Советы не найдены</h3>
                <p>Попробуйте выбрать другую категорию</p>
            </div>
        `;
        
        tipsGrid.appendChild(message);
        
        setTimeout(() => {
            message.classList.add('show');
        }, 50);
    }
    
    // Функция для скрытия сообщения "Нет результатов"
    function hideNoResultsMessage() {
        const message = tipsGrid.querySelector('.no-results-message');
        if (message) {
            message.classList.remove('show');
            setTimeout(() => {
                if (message.parentNode) {
                    message.parentNode.removeChild(message);
                }
            }, 500);
        }
    }
    
    // Функция для обновления счетчика карточек
    function updateCardCount(category, count) {
        const activeCard = document.querySelector(`.category-card[data-category="${category}"]`);
        if (activeCard) {
            const countElement = activeCard.querySelector('p');
            if (countElement) {
                if (category === 'all') {
                    countElement.textContent = `${allTipCards.length} совет${getCorrectEnding(allTipCards.length)}`;
                } else {
                    countElement.textContent = `${count} совет${getCorrectEnding(count)}`;
                }
            }
        }
    }
    
    // Вспомогательная функция для правильного склонения
    function getCorrectEnding(count) {
        if (count % 10 === 1 && count % 100 !== 11) {
            return '';
        } else if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
            return 'а';
        } else {
            return 'ов';
        }
    }
    
    // Обработчик клика для категорий
    categoryCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (card.classList.contains('active') || isAnimating) {
                return;
            }
            
            const category = card.getAttribute('data-category');

            filterCards(category);
        });
    });
    
    // Форма подписки
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const submitBtn = newsletterForm.querySelector('button[type="submit"]');
            
            if (!emailInput.value || !emailInput.value.includes('@')) {
                // Анимация ошибки
                emailInput.style.borderColor = '#dc3545';
                setTimeout(() => {
                    emailInput.style.borderColor = 'rgba(62, 122, 96, 0.5)';
                }, 2000);
                return;
            }
            
            const originalText = submitBtn.textContent;
            
            // Анимация отправки
            submitBtn.textContent = 'Отправка...';
            submitBtn.disabled = true;
            
            // Имитация отправки
            setTimeout(() => {
                submitBtn.textContent = '✓ Отправлено!';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    emailInput.value = '';
                }, 1500);
            }, 1500);
        });
    }
    
    // Инициализация счетчиков
    function initializeCounters() {
        const categories = {};
        allTipCards.forEach(card => {
            const category = card.getAttribute('data-category');
            categories[category] = (categories[category] || 0) + 1;
        });
        
        categoryCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const countElement = card.querySelector('p');
            if (countElement) {
                const count = category === 'all' ? allTipCards.length : (categories[category] || 0);
                countElement.textContent = `${count} совет${getCorrectEnding(count)}`;
            }
        });
    }
    
    initializeCounters();
    
    // Плавное появление карточек при загрузке страницы
    setTimeout(() => {
        allTipCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }, 300);

});
