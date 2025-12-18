document.addEventListener('DOMContentLoaded', () => {
    // Обработчики для клика по рецептам в категориях
    const categoryRecipeItems = document.querySelectorAll('.category-recipe-item');
    categoryRecipeItems.forEach(item => {
        item.addEventListener('click', () => {
            const recipeId = item.getAttribute('data-recipe-id');
            if (recipeId) {
                // Используем функцию из search.js для открытия модального окна
                if (typeof openRecipeModal === 'function') {
                    openRecipeModal(recipeId);
                }
            }
        });
    });
    
    // Обработчики для клика по карточкам категорий
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Если клик не по кнопке "Смотреть все" внутри карточки
            if (!e.target.closest('.view-all-btn')) {
                const category = card.getAttribute('data-category');
                // Показываем только рецепты этой категории
                filterRecipesByCategory(category);
                
                // Прокрутка к сетке рецептов
                const recipesGrid = document.querySelector('.recipes-grid');
                if (recipesGrid) {
                    recipesGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
    
    // Функция фильтрации рецептов по категории
    function filterRecipesByCategory(category) {
        const allRecipeCards = document.querySelectorAll('.recipe-card');
        let visibleCount = 0;
        
        allRecipeCards.forEach(card => {
            const recipeId = card.getAttribute('data-recipe-id');
            const shouldShow = isRecipeInCategory(recipeId, category);
            
            if (shouldShow) {
                card.style.display = 'block';
                visibleCount++;
                // Анимация появления
                card.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Показываем уведомление
        const categoryName = getCategoryName(category);
        showNotification(`Показаны ${visibleCount} рецептов из категории: ${categoryName}`, 'info');
        
        // Обновляем активную кнопку фильтра
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => btn.classList.remove('active'));
        filterBtns[0].classList.add('active'); // Активируем "Все рецепты"
    }
    
    // Функция для определения, принадлежит ли рецепт категории
    function isRecipeInCategory(recipeId, category) {
        // Здесь должна быть логика определения категории рецепта
        const recipeCategories = {
            '1': ['main'],
            '2': ['main'],
            '3': ['breakfast', 'quick'],
            '4': ['salad-soup'],
            '5': ['dessert'],
            '6': ['salad-soup'],
            '7': ['main'],
            '8': ['breakfast', 'quick'],
            '9': ['vegetarian', 'main'],
            '10': ['vegetarian'],
            '11': ['main'],
            '12': ['main']
        };
        
        return recipeCategories[recipeId] && recipeCategories[recipeId].includes(category);
    }
    
    // Функция для получения названия категории
    function getCategoryName(categoryKey) {
        const categoryNames = {
            'breakfast': 'Завтраки',
            'main': 'Основные блюда',
            'salad-soup': 'Салаты и супы',
            'vegetarian': 'Вегетарианское',
            'dessert': 'Десерты',
            'quick': 'Быстрые рецепты'
        };
        return categoryNames[categoryKey] || categoryKey;
    }
    
    // Обработчики для кнопок фильтрации
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterText = btn.textContent;
            
            if (filterText === 'Все рецепты') {
                // Показываем все рецепты
                const allRecipeCards = document.querySelectorAll('.recipe-card');
                allRecipeCards.forEach(card => {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                });
                showNotification(`Показаны все 12 рецептов`, 'info');
            } else if (filterText === 'Популярные') {
                // Фильтр популярных (просто показываем все)
                const allRecipeCards = document.querySelectorAll('.recipe-card');
                allRecipeCards.forEach(card => {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                });
                showNotification(`Показаны популярные рецепты`, 'info');
            } else if (filterText === 'Самые быстрые') {
                // Фильтр по времени (до 20 минут)
                const allRecipeCards = document.querySelectorAll('.recipe-card');
                let visibleCount = 0;
                
                allRecipeCards.forEach(card => {
                    const timeText = card.querySelector('.recipe-time').textContent;
                    const timeMatch = timeText.match(/(\d+)/);
                    const time = timeMatch ? parseInt(timeMatch[1]) : 0;
                    
                    if (time <= 20) {
                        card.style.display = 'block';
                        visibleCount++;
                        card.style.animation = 'fadeInUp 0.5s ease forwards';
                    } else {
                        card.style.display = 'none';
                    }
                });
                showNotification(`Показаны ${visibleCount} быстрых рецептов (до 20 минут)`, 'info');
            } else if (filterText === 'Низкокалорийные') {
                // Фильтр по калориям (до 300 ккал)
                const allRecipeCards = document.querySelectorAll('.recipe-card');
                let visibleCount = 0;
                
                allRecipeCards.forEach(card => {
                    const caloriesElement = card.querySelector('.recipe-calories');
                    if (caloriesElement) {
                        const caloriesText = caloriesElement.textContent;
                        const caloriesMatch = caloriesText.match(/(\d+)/);
                        const calories = caloriesMatch ? parseInt(caloriesMatch[1]) : 0;
                        
                        if (calories <= 300) {
                            card.style.display = 'block';
                            visibleCount++;
                            card.style.animation = 'fadeInUp 0.5s ease forwards';
                        } else {
                            card.style.display = 'none';
                        }
                    } else {
                        card.style.display = 'none';
                    }
                });
                showNotification(`Показаны ${visibleCount} низкокалорийных рецептов (до 300 ккал)`, 'info');
            } else if (filterText === 'Для начинающих') {
                // Фильтр по сложности (легко)
                const allRecipeCards = document.querySelectorAll('.recipe-card');
                let visibleCount = 0;
                
                allRecipeCards.forEach(card => {
                    const difficultyElement = card.querySelector('.recipe-difficulty');
                    if (difficultyElement) {
                        const difficultyText = difficultyElement.textContent;
                        
                        if (difficultyText.includes('Легко') || difficultyElement.classList.contains('easy')) {
                            card.style.display = 'block';
                            visibleCount++;
                            card.style.animation = 'fadeInUp 0.5s ease forwards';
                        } else {
                            card.style.display = 'none';
                        }
                    } else {
                        card.style.display = 'none';
                    }
                });
                showNotification(`Показаны ${visibleCount} легких рецептов для начинающих`, 'info');
            } else {
                // Для других фильтров - простая демонстрация
                showNotification(`Фильтр "${filterText}" применен`, 'info');
            }
        });
    });
    
    // Добавляем обработчики для кнопок "Посмотреть рецепт"
    const viewRecipeBtns = document.querySelectorAll('.view-recipe-btn');
    viewRecipeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Предотвращаем всплытие события
            const recipeId = btn.getAttribute('data-recipe-id');
            if (recipeId && typeof openRecipeModal === 'function') {
                openRecipeModal(recipeId);
            }
        });
    });
    
    // Добавляем обработчики для карточек рецептов
    const recipeCards = document.querySelectorAll('.recipe-card');
    recipeCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Открываем рецепт только если клик не по кнопке внутри карточки
            if (!e.target.closest('.view-recipe-btn')) {
                const recipeId = card.getAttribute('data-recipe-id');
                if (recipeId && typeof openRecipeModal === 'function') {
                    openRecipeModal(recipeId);
                }
            }
        });
    });
    
    // Кнопка "Показать еще рецепты"
    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            // В реальном приложении здесь была бы загрузка дополнительных рецептов
            // Для демонстрации просто показываем уведомление
            showNotification('Все рецепты уже загружены!', 'info');
            
            // Анимация кнопки
            loadMoreBtn.innerHTML = '<i class="fas fa-check"></i> Все рецепты загружены';
            loadMoreBtn.style.background = 'var(--medium-green)';
            loadMoreBtn.style.color = 'white';
            loadMoreBtn.style.borderColor = 'var(--accent-green)';
            loadMoreBtn.disabled = true;
            
            setTimeout(() => {
                loadMoreBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Показать еще рецепты';
                loadMoreBtn.style.background = 'transparent';
                loadMoreBtn.style.color = 'var(--accent-green)';
                loadMoreBtn.style.borderColor = 'var(--accent-green)';
                loadMoreBtn.disabled = false;
            }, 3000);
        });
    }
    
    // Функция для показа уведомлений
    function showNotification(message, type) {
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? 'var(--medium-green)' : 'var(--dark-green)'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            display: flex;
            align-items: center;
            gap: 1rem;
            z-index: 10000;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            animation: slideInRight 0.3s ease forwards;
            max-width: 350px;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.style.animation = 'slideOutRight 0.3s ease forwards';
                setTimeout(() => notification.remove(), 300);
            }
        }, 3000);
    }
    
    // Добавляем стили для анимации уведомлений, если их еще нет
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Обработчики для кнопок "Смотреть все" в категориях
    const viewAllBtns = document.querySelectorAll('.view-all-btn');
    viewAllBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation(); // Останавливаем всплытие
            
            const card = btn.closest('.category-card');
            const category = card.getAttribute('data-category');
            
            if (category) {
                filterRecipesByCategory(category);
                
                // Прокрутка к сетке рецептов
                const recipesGrid = document.querySelector('.recipes-grid');
                if (recipesGrid) {
                    recipesGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                
                // Активируем кнопку "Все рецепты" в фильтрах
                const filterBtns = document.querySelectorAll('.filter-btn');
                filterBtns.forEach(b => b.classList.remove('active'));
                if (filterBtns[0]) {
                    filterBtns[0].classList.add('active');
                }
            }
        });
    });
});