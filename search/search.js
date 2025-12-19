document.addEventListener('DOMContentLoaded', () => {
    // Инициализация всех переменных и функций
    const recipesGrid = document.querySelector('.recipes-grid');
    const resultsCount = document.querySelector('.results-count strong');
    const sortSelect = document.getElementById('sort-select');
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    // Переменные для управления рецептами
    let allRecipes = [];
    let filteredRecipes = [];
    let displayedRecipesCount = 12;
    const recipesPerLoad = 6;
    
    // Данные всех рецептов с подробной информацией
    const recipesData = {
        1: {
            id: 1,
            title: 'Спагетти Карбонара',
            image: '../images/recipe/спагетти.jpg',
            category: 'Итальянская',
            time: 25,
            difficulty: 'easy',
            calories: 420,
            tags: ['#паста', '#итальянская', '#ужин'],
            description: 'Классическое итальянское блюдо с беконом, яйцами и пармезаном',
            type: 'dinner',
            cuisine: 'italian',
            diet: '',
            ingredients: ['спагетти', 'яйца', 'бекон', 'пармезан', 'сливки'],
            cookingMethods: ['stove']
        },
        2: {
            id: 2,
            title: 'Курица в сливочном соусе',
            image: '../images/recipe/курица.jpg',
            category: 'Основное',
            time: 45,
            difficulty: 'medium',
            calories: 320,
            tags: ['#курица', '#основное', '#ужин'],
            description: 'Нежное куриное филе в сливочно-грибном соусе с травами',
            type: 'dinner',
            cuisine: 'russian',
            diet: '',
            ingredients: ['курица', 'сливки', 'грибы', 'лук', 'мука'],
            cookingMethods: ['stove']
        },
        3: {
            id: 3,
            title: 'Омлет с овощами',
            image: '../images/recipe/омлет.jpg',
            category: 'Завтрак',
            time: 15,
            difficulty: 'easy',
            calories: 280,
            tags: ['#завтрак', '#быстро', '#омлет'],
            description: 'Пышный омлет с помидорами, перцем и зеленью',
            type: 'breakfast',
            cuisine: 'russian',
            diet: '',
            ingredients: ['яйца', 'помидоры', 'перец', 'лук', 'молоко'],
            cookingMethods: ['stove']
        },
        4: {
            id: 4,
            title: 'Греческий салат',
            image: '../images/recipe/салатгрек.jpg',
            category: 'Салат',
            time: 20,
            difficulty: 'easy',
            calories: 180,
            tags: ['#салат', '#здоровое', '#овощи'],
            description: 'Классический средиземноморский салат с сыром фета',
            type: 'salad',
            cuisine: 'mediterranean',
            diet: 'vegetarian',
            ingredients: ['помидоры', 'огурец', 'сыр фета', 'оливки', 'лук'],
            cookingMethods: []
        },
        5: {
            id: 5,
            title: 'Шоколадный торт',
            image: '../images/recipe/тротшок.jpg',
            category: 'Десерт',
            time: 60,
            difficulty: 'hard',
            calories: 480,
            tags: ['#десерт', '#торт', '#шоколад'],
            description: 'Влажный шоколадный торт с глазурью из темного шоколада',
            type: 'dessert',
            cuisine: 'american',
            diet: '',
            ingredients: ['мука', 'сахар', 'яйца', 'шоколад', 'масло'],
            cookingMethods: ['oven']
        },
        6: {
            id: 6,
            title: 'Тыквенный суп-пюре',
            image: '../images/recipe/суптыква.jpg',
            category: 'Суп',
            time: 40,
            difficulty: 'medium',
            calories: 220,
            tags: ['#суп', '#тыква', '#обед'],
            description: 'Кремовый суп из тыквы с имбирем и кокосовым молоком',
            type: 'soup',
            cuisine: 'russian',
            diet: 'vegan',
            ingredients: ['тыква', 'лук', 'имбирь', 'кокосовое молоко'],
            cookingMethods: ['stove']
        },
        7: {
            id: 7,
            title: 'Пицца Маргарита',
            image: '../images/recipe/пиццамаргарита.jpg',
            category: 'Итальянская',
            time: 20,
            difficulty: 'easy',
            calories: 380,
            tags: ['#пицца', '#итальянская', '#ужин'],
            description: 'Классическая пицца с томатным соусом, моцареллой и базиликом',
            type: 'dinner',
            cuisine: 'italian',
            diet: 'vegetarian',
            ingredients: ['мука', 'дрожжи', 'томаты', 'сыр моцарелла', 'базилик'],
            cookingMethods: ['oven']
        },
        8: {
            id: 8,
            title: 'Блины с ягодами',
            image: '../images/recipe/блиныягоды.jpg',
            category: 'Завтрак',
            time: 10,
            difficulty: 'easy',
            calories: 250,
            tags: ['#блины', '#завтрак', '#сладкое'],
            description: 'Тонкие блинчики со свежими ягодами и кленовым сиропом',
            type: 'breakfast',
            cuisine: 'russian',
            diet: '',
            ingredients: ['мука', 'яйца', 'молоко', 'ягоды', 'сахар'],
            cookingMethods: ['stove']
        },
        9: {
            id: 9,
            title: 'Вегетарианская лазанья',
            image: '../images/recipe/лазаньявеган.jpg',
            category: 'Вегетарианское',
            time: 35,
            difficulty: 'medium',
            calories: 320,
            tags: ['#вегетарианское', '#итальянская', '#основное'],
            description: 'Слоеная паста с овощами, сыром и томатным соусом',
            type: 'dinner',
            cuisine: 'italian',
            diet: 'vegetarian',
            ingredients: ['лапша для лазаньи', 'помидоры', 'сыр', 'шпинат', 'грибы'],
            cookingMethods: ['oven']
        },
        10: {
            id: 10,
            title: 'Киноа с овощами',
            image: '../images/recipe/киноа.jpg',
            category: 'Здоровое',
            time: 25,
            difficulty: 'easy',
            calories: 190,
            tags: ['#киноа', '#здоровое', '#вегетарианское'],
            description: 'Полезное блюдо из киноа с обжаренными овощами',
            type: 'dinner',
            cuisine: 'mediterranean',
            diet: 'vegan',
            ingredients: ['киноа', 'перец', 'цуккини', 'лук', 'чеснок'],
            cookingMethods: ['stove']
        },
        11: {
            id: 11,
            title: 'Жареный рис с курицей',
            image: '../images/recipe/рискурица.jpg',
            category: 'Азиатская',
            time: 30,
            difficulty: 'medium',
            calories: 350,
            tags: ['#азиатская', '#рис', '#курица'],
            description: 'Азиатский жареный рис с курицей, овощами и соевым соусом',
            type: 'dinner',
            cuisine: 'asian',
            diet: '',
            ingredients: ['рис', 'курица', 'яйца', 'морковь', 'горошек'],
            cookingMethods: ['stove']
        },
        12: {
            id: 12,
            title: 'Лосось на гриле',
            image: '../images/recipe/лососьгриль.jpg',
            category: 'Диетическое',
            time: 40,
            difficulty: 'easy',
            calories: 280,
            tags: ['#лосось', '#здоровое', '#гриль'],
            description: 'Лосось на гриле с лимоном и зеленью, подается с овощами',
            type: 'dinner',
            cuisine: 'mediterranean',
            diet: '',
            ingredients: ['лосось', 'лимон', 'овощи', 'оливковое масло'],
            cookingMethods: ['grill']
        }
    };
    
    // Инициализация всех рецептов
    allRecipes = Object.values(recipesData);
    filteredRecipes = [...allRecipes];
    
    // Переключение между вкладками поиска
    const searchTabs = document.querySelectorAll('.search-tab');
    const tabContents = document.querySelectorAll('.search-tab-content');
    
    searchTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            
            searchTabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            tab.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
    
    // Управление поиском по продуктам
    const ingredientInput = document.getElementById('ingredient-input');
    const addIngredientBtn = document.getElementById('add-ingredient-btn');
    const selectedIngredients = document.getElementById('selected-ingredients');
    const quickTags = document.querySelectorAll('.quick-tag');
    
    let selectedIngredientList = [];
    
    function addIngredient(ingredient) {
        if (!ingredient.trim()) return;
        
        const ingredientLower = ingredient.toLowerCase().trim();
        
        if (!selectedIngredientList.includes(ingredientLower)) {
            selectedIngredientList.push(ingredientLower);
            
            const ingredientTag = document.createElement('div');
            ingredientTag.className = 'ingredient-tag';
            ingredientTag.innerHTML = `
                ${ingredient}
                <button type="button" class="remove-ingredient">
                    <i class="fas fa-times"></i>
                </button>
            `;
            
            selectedIngredients.appendChild(ingredientTag);
            
            const removeBtn = ingredientTag.querySelector('.remove-ingredient');
            removeBtn.addEventListener('click', () => {
                const index = selectedIngredientList.indexOf(ingredientLower);
                if (index > -1) {
                    selectedIngredientList.splice(index, 1);
                }
                ingredientTag.remove();
            });
        }
        
        ingredientInput.value = '';
        ingredientInput.focus();
    }
    
    if (addIngredientBtn) {
        addIngredientBtn.addEventListener('click', () => {
            addIngredient(ingredientInput.value);
        });
    }
    
    if (ingredientInput) {
        ingredientInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                addIngredient(ingredientInput.value);
            }
        });
    }
    
    quickTags.forEach(tag => {
        tag.addEventListener('click', () => {
            const ingredient = tag.getAttribute('data-ingredient');
            addIngredient(ingredient);
        });
    });
    
    // Обновление значения слайдера калорий
    const caloriesSlider = document.getElementById('calories');
    const caloriesValue = document.getElementById('calories-value');
    
    if (caloriesSlider && caloriesValue) {
        caloriesSlider.addEventListener('input', () => {
            caloriesValue.textContent = `${caloriesSlider.value} ккал`;
        });
    }
    
    function filterRecipes() {
    // Определение активной вкладки
    const activeTab = document.querySelector('.search-tab.active').getAttribute('data-tab');
    console.log('Активная вкладка:', activeTab);
    
    // Очищение предыдущих фильтров
    let searchQuery = '';
    let cookingTime = '';
    let dishType = '';
    let difficulty = '';
    let cuisine = '';
    let diet = '';
    let maxCalories = 1000;
    let cookingMethods = [];
    let ingredientTime = '';
    let ingredientType = '';
    
    // Получение значения только из активной вкладки
    if (activeTab === 'basic') {
        // Фильтры из вкладки "Быстрый поиск"
        const basicQueryEl = document.getElementById('basic-query');
        const cookingTimeEl = document.getElementById('cooking-time');
        const dishTypeEl = document.getElementById('dish-type');
        const difficultyEl = document.getElementById('difficulty');
        
        searchQuery = basicQueryEl ? basicQueryEl.value.toLowerCase() : '';
        cookingTime = cookingTimeEl ? cookingTimeEl.value : '';
        dishType = dishTypeEl ? dishTypeEl.value : '';
        difficulty = difficultyEl ? difficultyEl.value : '';
        
        console.log('Параметры поиска:');
        console.log('- Поисковый запрос:', searchQuery);
        console.log('- Время приготовления (значение):', cookingTime);
        console.log('- Тип блюда:', dishType);
        console.log('- Сложность:', difficulty);
    }
    else if (activeTab === 'advanced') {
        // Фильтры из вкладки "Расширенный поиск"
        const cuisineEl = document.getElementById('cuisine');
        const dietEl = document.getElementById('diet');
        const caloriesEl = document.getElementById('calories');
        
        cuisine = cuisineEl ? cuisineEl.value : '';
        diet = dietEl ? dietEl.value : '';
        maxCalories = caloriesEl ? caloriesEl.value : 1000;
        
        cookingMethods = Array.from(document.querySelectorAll('input[name="cooking-method"]:checked'))
            .map(cb => cb.id.replace('method-', ''));
    }
    else if (activeTab === 'ingredients') {
        // Фильтры из вкладки "По продуктам"
        const ingredientTimeEl = document.getElementById('ingredient-time');
        const ingredientTypeEl = document.getElementById('ingredient-type');
        
        ingredientTime = ingredientTimeEl ? ingredientTimeEl.value : '';
        ingredientType = ingredientTypeEl ? ingredientTypeEl.value : '';
    }
    
    console.log('Все рецепты для фильтрации:', allRecipes.length);
    console.log('Пример рецепта курицы:', allRecipes.find(r => r.id === 2));
    
    filteredRecipes = allRecipes.filter(recipe => {
        let passesFilters = true;
        const debugInfo = { 
            recipeId: recipe.id, 
            recipeTitle: recipe.title,
            recipeTime: recipe.time 
        };
        
        // 1. Базовый поиск по названию, описанию и тегам (только для активной вкладки)
        if (searchQuery) {
            const searchInTitle = recipe.title.toLowerCase().includes(searchQuery);
            const searchInDescription = recipe.description.toLowerCase().includes(searchQuery);
            const searchInTags = recipe.tags.some(tag => 
                tag.toLowerCase().includes(searchQuery.replace('#', ''))
            );
            
            debugInfo.searchQuery = searchQuery;
            debugInfo.searchInTitle = searchInTitle;
            debugInfo.searchInDescription = searchInDescription;
            debugInfo.searchInTags = searchInTags;
            
            if (!searchInTitle && !searchInDescription && !searchInTags) {
                debugInfo.failedReason = 'Не совпадает поисковый запрос';
                passesFilters = false;
            }
        }
        
// 2. Фильтр по времени приготовления 
if (passesFilters && cookingTime) {
    let timePasses = false;
    const recipeTime = recipe.time;
    const cookingTimeValue = parseInt(cookingTime); 
    
    switch(cookingTime) {
        case '10': // До 10 минут
            timePasses = recipeTime <= 10;
            debugInfo.timeFilter = `До 10 минут: ${recipeTime} <= 10`;
            break;
        case '15': // До 15 минут
            timePasses = recipeTime <= 15;
            debugInfo.timeFilter = `До 15 минут: ${recipeTime} <= 15`;
            break;
        case '20': // До 20 минут
            timePasses = recipeTime <= 20;
            debugInfo.timeFilter = `До 20 минут: ${recipeTime} <= 20`;
            break;
        case '25': // До 25 минут
            timePasses = recipeTime <= 25;
            debugInfo.timeFilter = `До 25 минут: ${recipeTime} <= 25`;
            break;
        case '30': // До 30 минут
            timePasses = recipeTime <= 30;
            debugInfo.timeFilter = `До 30 минут: ${recipeTime} <= 30`;
            break;
        case '35': // До 35 минут
            timePasses = recipeTime <= 35;
            debugInfo.timeFilter = `До 35 минут: ${recipeTime} <= 35`;
            break;
        case '40': // До 40 минут
            timePasses = recipeTime <= 40;
            debugInfo.timeFilter = `До 40 минут: ${recipeTime} <= 40`;
            break;
        case '45': // До 45 минут
            timePasses = recipeTime <= 45;
            debugInfo.timeFilter = `До 45 минут: ${recipeTime} <= 45`;
            break;
        case '60': // До 1 часа (60 минут)
            timePasses = recipeTime <= 60;
            debugInfo.timeFilter = `До 1 часа: ${recipeTime} <= 60`;
            break;
        case '120': // До 2 часов (120 минут)
            timePasses = recipeTime <= 120;
            debugInfo.timeFilter = `До 2 часов: ${recipeTime} <= 120`;
            break;
        case '180': // Более 2 часов
            timePasses = recipeTime > 120;
            debugInfo.timeFilter = `Более 2 часов: ${recipeTime} > 120`;
            break;
        default:
            timePasses = true; 
            debugInfo.timeFilter = 'Любое время';
    }
    
    if (!timePasses) {
        debugInfo.failedReason = `Не проходит по времени: ${recipeTime} мин (фильтр: ${cookingTime})`;
        passesFilters = false;
    }
}
        
        // 3. Фильтр по типу блюда 
        if (passesFilters && dishType && recipe.type !== dishType) {
            debugInfo.failedReason = `Тип блюда ${recipe.type} !== ${dishType}`;
            passesFilters = false;
        }
        
        if (passesFilters && ingredientType && recipe.type !== ingredientType) {
            debugInfo.failedReason = `Тип блюда ${recipe.type} !== ${ingredientType}`;
            passesFilters = false;
        }
        
        // 4. Фильтр по сложности
        if (passesFilters && difficulty && recipe.difficulty !== difficulty) {
            debugInfo.failedReason = `Сложность ${recipe.difficulty} !== ${difficulty}`;
            passesFilters = false;
        }
        
        // 5. Фильтр по кухне (только для расширенного поиска)
        if (passesFilters && activeTab === 'advanced' && cuisine && recipe.cuisine !== cuisine) {
            debugInfo.failedReason = `Кухня ${recipe.cuisine} !== ${cuisine}`;
            passesFilters = false;
        }
        
        // 6. Фильтр по диете (только для расширенного поиска)
if (passesFilters && activeTab === 'advanced' && diet && recipe.diet !== diet) {
    debugInfo.failedReason = `Диета ${recipe.diet} !== ${diet}`;
    passesFilters = false;
}
        
        // 7. Фильтр по калориям (только для расширенного поиска)
        if (passesFilters && activeTab === 'advanced' && maxCalories && recipe.calories > parseInt(maxCalories)) {
            debugInfo.failedReason = `Калории ${recipe.calories} > ${maxCalories}`;
            passesFilters = false;
        }
        
        // 8. Фильтр по способу приготовления (только для расширенного поиска)
        if (passesFilters && activeTab === 'advanced' && cookingMethods.length > 0) {
            const hasCommonMethod = cookingMethods.some(method => 
                recipe.cookingMethods.includes(method)
            );
            if (!hasCommonMethod) {
                debugInfo.failedReason = `Нет совпадающих способов приготовления`;
                passesFilters = false;
            }
        }
        
        // 9. Фильтр по ингредиентам (только для вкладки "По продуктам")
        if (passesFilters && activeTab === 'ingredients' && selectedIngredientList.length > 0) {
            const hasMatchingIngredient = selectedIngredientList.some(selectedIngredient => {
                return recipe.ingredients.some(recipeIngredient => 
                    recipeIngredient.toLowerCase().includes(selectedIngredient.toLowerCase())
                );
            });
            
            if (!hasMatchingIngredient) {
                debugInfo.failedReason = `Нет совпадающих ингредиентов`;
                passesFilters = false;
            }
        }
        
        if (!passesFilters) {
            console.log('Рецепт отфильтрован:', debugInfo);
        } else {
            console.log('Рецепт прошел фильтры:', recipe.title, `(${recipe.time} мин)`);
        }
        
        return passesFilters;
    });
    
    console.log('Результаты фильтрации:', filteredRecipes.length, 'рецептов');
    console.log('Найденные рецепты:', filteredRecipes.map(r => `${r.title} (${r.time} мин)`));
    
    // Сортировка
    const sortType = sortSelect?.value || 'relevance';
    sortRecipes(filteredRecipes, sortType);
    
    // После фильтрации сброс счетчика отображаемых рецептов
    displayedRecipesCount = Math.min(recipesPerLoad, filteredRecipes.length);
    
    // Обновление отображения
    updateRecipesDisplay();

    return filteredRecipes;
}
    
    // Функция сортировки рецептов
    function sortRecipes(recipes, sortType) {
        switch(sortType) {
            case 'time-asc':
                recipes.sort((a, b) => a.time - b.time);
                break;
            case 'time-desc':
                recipes.sort((a, b) => b.time - a.time);
                break;
            case 'calories-asc':
                recipes.sort((a, b) => a.calories - b.calories);
                break;
            case 'calories-desc':
                recipes.sort((a, b) => b.calories - a.calories);
                break;
            case 'difficulty':
                const difficultyOrder = { 'easy': 1, 'medium': 2, 'hard': 3 };
                recipes.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
                break;
            case 'relevance':
            default:
                recipes.sort((a, b) => {
                    if (selectedIngredientList.length > 0) {
                        const aMatches = selectedIngredientList.filter(ing => 
                            a.ingredients.some(ri => ri.toLowerCase().includes(ing))
                        ).length;
                        const bMatches = selectedIngredientList.filter(ing => 
                            b.ingredients.some(ri => ri.toLowerCase().includes(ing))
                        ).length;
                        return bMatches - aMatches;
                    }
                    return a.id - b.id;
                });
                break;
        }
    }
    
    // Функция обновления отображения рецептов
    function updateRecipesDisplay() {
        const recipesToShow = filteredRecipes.slice(0, displayedRecipesCount);
        
        recipesGrid.innerHTML = '';
        
        if (filteredRecipes.length === 0) {
            recipesGrid.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>Рецепты не найдены</h3>
                    <p>Попробуйте изменить параметры поиска</p>
                </div>
            `;
            if (resultsCount) {
                resultsCount.textContent = `0 рецептов`;
            }
            if (loadMoreBtn) loadMoreBtn.style.display = 'none';
            return;
        }
        
        recipesToShow.forEach(recipe => {
            const recipeCard = createRecipeCard(recipe);
            recipesGrid.appendChild(recipeCard);
        });
        
        // Обновление счетчика
        if (resultsCount) {
            resultsCount.textContent = `${filteredRecipes.length} рецептов`;
        }

        if (loadMoreBtn) {
            if (displayedRecipesCount < filteredRecipes.length) {
                loadMoreBtn.style.display = 'flex';
            } else {
                loadMoreBtn.style.display = 'none';
            }
        }
        
        addViewRecipeHandlers();
    }
    
    // Функция создания карточки рецепта
    function createRecipeCard(recipe) {
        const card = document.createElement('article');
        card.className = 'recipe-card';
        card.setAttribute('data-recipe-id', recipe.id);
        
        // Текст сложности
        let difficultyText = '';
        let difficultyColorClass = '';
        switch(recipe.difficulty) {
            case 'easy': 
                difficultyText = 'Легко'; 
                difficultyColorClass = 'easy';
                break;
            case 'medium': 
                difficultyText = 'Средне'; 
                difficultyColorClass = 'medium';
                break;
            case 'hard': 
                difficultyText = 'Сложно'; 
                difficultyColorClass = 'hard';
                break;
        }
        
        card.innerHTML = `
            <div class="recipe-image">
                <div class="recipe-image-inner" style="background-image: url('${recipe.image}');"></div>
                <div class="recipe-badge">${recipe.category}</div>
                <div class="recipe-time"><i class="far fa-clock"></i> ${recipe.time} мин</div>
            </div>
            <div class="recipe-content">
                <h3 class="recipe-title">${recipe.title}</h3>
                <p class="recipe-description">${recipe.description}</p>
                <div class="recipe-meta">
                    <span class="recipe-difficulty ${difficultyColorClass}"><i class="fas fa-signal"></i> ${difficultyText}</span>
                    <span class="recipe-calories"><i class="fas fa-fire"></i> ${recipe.calories} ккал</span>
                </div>
                <div class="recipe-tags">
                    ${recipe.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <button class="view-recipe-btn" data-recipe-id="${recipe.id}">
                    Посмотреть рецепт
                    <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        `;
        
        return card;
    }
    
    // Функция для загрузки дополнительных рецептов
    function loadMoreRecipes() {
        displayedRecipesCount = Math.min(displayedRecipesCount + recipesPerLoad, filteredRecipes.length);
        updateRecipesDisplay();
        
        const newCards = recipesGrid.querySelectorAll('.recipe-card');
        if (newCards.length > 0) {
            const lastCard = newCards[newCards.length - 1];
            lastCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
    
    // Функция открытия модального окна с рецептом
    function openRecipeModal(recipeId) {
        const modal = document.getElementById(`recipe-modal-${recipeId}`);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Функция закрытия модального окна
    function closeRecipeModal(recipeId) {
        const modal = document.getElementById(`recipe-modal-${recipeId}`);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // Добавление обработчиков для кнопок просмотра рецептов
    function addViewRecipeHandlers() {
        const newViewRecipeBtns = document.querySelectorAll('.view-recipe-btn');
        newViewRecipeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const recipeId = e.currentTarget.getAttribute('data-recipe-id');
                openRecipeModal(recipeId);
            });
        });
    }
    
    // Обработчики для модального окна
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', function() {
            const modal = this.closest('.recipe-modal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.recipe-modal.active').forEach(modal => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
    });
    
    // Переключение вкладок в модальном окне
    document.querySelectorAll('.modal-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const modal = this.closest('.recipe-modal');
            if (!modal) return;
            
            const tabId = this.getAttribute('data-tab');
            const tabs = modal.querySelectorAll('.modal-tab');
            const contents = modal.querySelectorAll('.modal-tab-content');
            
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(content => content.classList.remove('active'));
            
            this.classList.add('active');
            const targetContent = modal.querySelector(`#${tabId}`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
    
    // Обработка отправки форм поиска
    const searchForms = document.querySelectorAll('.search-form');
    
    if (searchForms && searchForms.length > 0) {
        searchForms.forEach(form => {
            form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = form.querySelector('.search-submit-btn');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Поиск...';
    submitBtn.disabled = true;
    
    // Определение ктивной вкладки
    const activeTab = document.querySelector('.search-tab.active').getAttribute('data-tab');
    
    // Индикатор загрузки
    const searchingIndicator = document.createElement('div');
    searchingIndicator.className = 'searching-indicator';
    searchingIndicator.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Ищем рецепты...';
    
    if (recipesGrid) {
        recipesGrid.innerHTML = '';
        recipesGrid.appendChild(searchingIndicator);
    }
    
    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Фильтр рецептов
        const foundRecipes = filterRecipes();
        
        // Прокрутка к результатам
        const resultsSection = document.getElementById('search-results');
        if (resultsSection) {
            resultsSection.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Уведомление если найдено меньше всех рецептов
        if (foundRecipes.length < allRecipes.length) {
            showNotification(`Найдено ${foundRecipes.length} рецептов`, 'success');
        }
    }, 800);
            });
        });
    }
    
   // Быстрые фильтры 
const quickFilterItems = document.querySelectorAll('.quick-filter-item');

if (quickFilterItems && quickFilterItems.length > 0) {
    quickFilterItems.forEach(item => {
        item.addEventListener('click', () => {
            const filterType = item.getAttribute('data-filter');
            
            // Сначала сбросим все фильтры
            resetAllFilters();
            
            // Определим, какую вкладку открыть
            let targetTab = 'basic';
            
            // Применяем фильтры в зависимости от типа
            switch(filterType) {
                case 'quick':
                    // Быстрые рецепты (до 30 минут)
                    document.querySelector('[data-tab="basic"]').click();
                    setTimeout(() => {
                        document.getElementById('cooking-time').value = '30';
                        filterRecipes();
                    }, 100);
                    break;
                    
                case 'easy':
                    // Легкие рецепты для начинающих
                    document.querySelector('[data-tab="basic"]').click();
                    setTimeout(() => {
                        document.getElementById('difficulty').value = 'easy';
                        filterRecipes();
                    }, 100);
                    break;
                    
                case 'healthy':
                    // Здоровые рецепты (до 400 ккал)
                    document.querySelector('[data-tab="advanced"]').click();
                    setTimeout(() => {
                        document.getElementById('calories').value = '400';
                        if (caloriesValue) {
                            caloriesValue.textContent = '400 ккал';
                            caloriesSlider.value = '400';
                        }
                        filterRecipes();
                    }, 100);
                    break;
                    
                case 'budget':
                    // Бюджетные рецепты
                    document.querySelector('[data-tab="ingredients"]').click();
                    setTimeout(() => {
                        // Добавляем бюджетные ингредиенты
                        const budgetIngredients = ['картофель', 'лук', 'морковь', 'яйца', 'мука'];
                        selectedIngredientList = [...budgetIngredients];
                        updateSelectedIngredientsDisplay();
                        filterRecipes();
                    }, 100);
                    break;
                    
                case 'family':
                    // Рецепты для всей семьи (основные блюда до 60 минут)
                    document.querySelector('[data-tab="basic"]').click();
                    setTimeout(() => {
                        document.getElementById('dish-type').value = 'dinner'; // Исправлено с 'main' на 'dinner'
                        document.getElementById('cooking-time').value = '60';
                        filterRecipes();
                    }, 100);
                    break;
                    
                default:
                    console.log('Неизвестный тип фильтра:', filterType);
            }
            
            // Визуальная обратная связь для выбранного фильтра
            quickFilterItems.forEach(i => {
                i.style.opacity = '0.7';
                i.style.transform = 'none';
                i.style.boxShadow = 'none';
            });
            
            item.style.opacity = '1';
            item.style.transform = 'translateY(-5px)';
            item.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
            
            // Прокрутка к результатам
            const resultsSection = document.getElementById('search-results');
            if (resultsSection) {
                setTimeout(() => {
                    resultsSection.scrollIntoView({ behavior: 'smooth' });
                }, 200);
            }
            
            // Уведомление о применении фильтра
            showNotification(`Применен фильтр: ${getFilterText(filterType)}`, 'info');
        });
    });
}
    
    // Функция для получения текста фильтра
    function getFilterText(filterType) {
        switch(filterType) {
            case 'quick': return 'Быстрые рецепты (до 30 минут)';
            case 'easy': return 'Легкие рецепты для начинающих';
            case 'healthy': return 'Здоровые рецепты';
            case 'budget': return 'Бюджетные рецепты';
            case 'family': return 'Рецепты для всей семьи';
            default: return 'Фильтр применен';
        }
    }
    
    // Функция обновления отображения выбранных ингредиентов
    function updateSelectedIngredientsDisplay() {
        selectedIngredients.innerHTML = '';
        selectedIngredientList.forEach(ingredient => {
            const ingredientTag = document.createElement('div');
            ingredientTag.className = 'ingredient-tag';
            ingredientTag.innerHTML = `
                ${ingredient}
                <button type="button" class="remove-ingredient">
                    <i class="fas fa-times"></i>
                </button>
            `;
            
            selectedIngredients.appendChild(ingredientTag);
            
            const removeBtn = ingredientTag.querySelector('.remove-ingredient');
            removeBtn.addEventListener('click', () => {
                const index = selectedIngredientList.indexOf(ingredient);
                if (index > -1) {
                    selectedIngredientList.splice(index, 1);
                }
                ingredientTag.remove();
            });
        });
    }
    
    // Функция сброса всех фильтров
    function resetAllFilters() {
        const basicQuery = document.getElementById('basic-query');
        const cookingTime = document.getElementById('cooking-time');
        const dishType = document.getElementById('dish-type');
        const difficulty = document.getElementById('difficulty');
        
        if (basicQuery) basicQuery.value = '';
        if (cookingTime) cookingTime.value = '';
        if (dishType) dishType.value = '';
        if (difficulty) difficulty.value = '';
        
        const cuisine = document.getElementById('cuisine');
        const diet = document.getElementById('diet');
        const calories = document.getElementById('calories');
        
        if (cuisine) cuisine.value = '';
        if (diet) diet.value = '';
        if (calories) {
            calories.value = '500';
            if (caloriesValue) caloriesValue.textContent = '500 ккал';
        }
        
        document.querySelectorAll('input[name="cooking-method"]').forEach(cb => {
            cb.checked = false;
        });
        
        // Очищение выбранных ингредиентов
        selectedIngredientList = [];
        updateSelectedIngredientsDisplay();
        
        const ingredientTime = document.getElementById('ingredient-time');
        const ingredientType = document.getElementById('ingredient-type');
        
        if (ingredientTime) ingredientTime.value = '';
        if (ingredientType) ingredientType.value = '';
        
        // Сброс визуальных эффектов быстрых фильтров
        quickFilterItems.forEach(item => {
            item.style.opacity = '1';
            item.style.transform = 'none';
            item.style.boxShadow = 'none';
        });
    }
    
    // Кнопка сброса фильтров
    const resetFiltersBtn = document.createElement('button');
    resetFiltersBtn.className = 'reset-filters-btn';
    resetFiltersBtn.innerHTML = '<i class="fas fa-times"></i> Сбросить фильтры';
    resetFiltersBtn.style.cssText = `
        background: rgba(255, 255, 255, 0.1);
        color: #fff;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        cursor: pointer;
        font-size: 0.9rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transition: all 0.3s ease;
    `;
    
    resetFiltersBtn.addEventListener('mouseenter', () => {
        resetFiltersBtn.style.background = 'rgba(255, 255, 255, 0.2)';
    });
    
    resetFiltersBtn.addEventListener('mouseleave', () => {
        resetFiltersBtn.style.background = 'rgba(255, 255, 255, 0.1)';
    });
    
    resetFiltersBtn.addEventListener('click', () => {
        resetAllFilters();
        filterRecipes();
        showNotification('Все фильтры сброшены', 'info');
    });
    
    // Кнопку сброса в заголовок результатов
    const resultsHeader = document.querySelector('.results-header');
    if (resultsHeader) {
        // Контейнер для информации и кнопки сброса
        const metaContainer = document.createElement('div');
        metaContainer.style.display = 'flex';
        metaContainer.style.alignItems = 'center';
        metaContainer.style.gap = '1.5rem';
        metaContainer.style.flexWrap = 'wrap';
        
        // Перемещение существующей информации в контейнер
        const existingMeta = document.querySelector('.results-meta');
        if (existingMeta) {
            metaContainer.appendChild(existingMeta);
        }
        
        // Кнопку сброса в контейнер
        metaContainer.appendChild(resetFiltersBtn);
        
        // Контейнер в заголовок
        resultsHeader.appendChild(metaContainer);
    }
    
    // Сортировка результатов
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            sortRecipes(filteredRecipes, sortSelect.value);
            updateRecipesDisplay();
        });
    }
    
    // Кнопка "Показать еще"
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            const originalText = loadMoreBtn.innerHTML;
            
            loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Загрузка...';
            loadMoreBtn.disabled = true;
            
            setTimeout(() => {
                loadMoreBtn.innerHTML = originalText;
                loadMoreBtn.disabled = false;
                loadMoreRecipes();
            }, 500);
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
    
    // Стили для анимации уведомлений
    const style = document.createElement('style');
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
        
        .results-header {
            display: flex !important;
            justify-content: space-between !important;
            align-items: flex-start !important;
            flex-wrap: wrap !important;
            gap: 1.5rem !important;
            margin-bottom: 2.5rem !important;
        }
        
        .results-header .section-title {
            margin: 0 !important;
            flex: 1 !important;
            min-width: 200px !important;
        }
        
        .results-meta {
            display: flex !important;
            align-items: center !important;
            gap: 2rem !important;
            flex-wrap: wrap !important;
        }
        
        .reset-filters-btn:hover {
            background: rgba(255, 255, 255, 0.2) !important;
        }
        
        .recipe-calories {
            color: #aaa;
            display: flex;
            align-items: center;
            gap: 0.3rem;
            font-size: 0.85rem;
        }
        
        .recipe-calories i {
            color: var(--accent-green);
        }
        
        .searching-indicator {
            text-align: center;
            padding: 3rem;
            color: var(--accent-green);
            font-size: 1.2rem;
            grid-column: 1 / -1;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 15px;
            border: 1px dashed rgba(62, 122, 96, 0.3);
        }
        
        .searching-indicator i {
            margin-right: 1rem;
        }
        
        .quick-filter-item {
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .quick-filter-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }
        
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--medium-green);
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
        }
        
        .notification.info {
            background: var(--dark-green);
        }
    `;
    document.head.appendChild(style);
    
    // Функция для добавления стилей в CSS для новых классов
    function addDynamicStyles() {
        const dynamicStyle = document.createElement('style');
        dynamicStyle.textContent = `
            .recipe-calories {
                color: #aaa;
                display: flex;
                align-items: center;
                gap: 0.3rem;
                font-size: 0.85rem;
            }
            
            .recipe-calories i {
                color: var(--accent-green);
            }
            
            .searching-indicator {
                text-align: center;
                padding: 3rem;
                color: var(--accent-green);
                font-size: 1.2rem;
                grid-column: 1 / -1;
                background: rgba(0, 0, 0, 0.2);
                border-radius: 15px;
                border: 1px dashed rgba(62, 122, 96, 0.3);
            }
            
            .searching-indicator i {
                margin-right: 1rem;
            }
            
            .quick-filter-item {
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .quick-filter-item:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
            }
        `;
        document.head.appendChild(dynamicStyle);
    }
    
    // Инициализация при загрузке
    addDynamicStyles();
    updateRecipesDisplay();
    addViewRecipeHandlers();

// Глобальные функции для onclick
window.closeModal = function(recipeId) {
    const modal = document.getElementById(`recipe-modal-${recipeId}`);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
};

window.switchTab = function(tabId) {
    const modal = document.querySelector('.recipe-modal.active');
    if (!modal) return;
    
    // Убрать активный класс у всех вкладок в этом модальном окне
    modal.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
    modal.querySelectorAll('.modal-tab-content').forEach(c => c.classList.remove('active'));
    
    // Найти и активировать нужную вкладку
    const tab = modal.querySelector(`[data-tab="${tabId}"]`);
    const content = document.getElementById(tabId);
    
    if (tab) tab.classList.add('active');
    if (content) content.classList.add('active');
};

window.saveRecipe = function(recipeId) {
    showNotification(`Рецепт #${recipeId} сохранен в избранное`, 'success');
    
    // Визуальная обратная связь
    const btn = document.querySelector(`#recipe-modal-${recipeId} .save-recipe-btn`);
    if (btn) {
        const icon = btn.querySelector('i');
        if (icon) {
            icon.className = 'fas fa-heart';
            const buttonText = btn.textContent.trim();
            btn.innerHTML = `<i class="fas fa-heart"></i> ${buttonText}`;
            btn.style.backgroundColor = 'var(--accent-green)';
            btn.style.color = 'white';
        }
    }
};


});


