export const DEFAULT_DATA_IDS = [{id: 'usuarios',
    title: 'Información de usuarios',
    graphTypes: ['Barras', 'Pie'],
}, {id: 'trafico',
    title: 'Tráfico de red',
    graphTypes: ['Barras', 'Pie', 'Área', 'Líneas'],
}, {id: 'inventario',
    title: 'Inventario de e-commerce',
    graphTypes: ['Barras', 'Pie', 'Polar'],
}]

export const TypesOfDates = [
    { key: 'YYYY/MM/DD', label: 'YYYY/MM/DD' },
    { key: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
    { key: 'MM/YYYY', label: 'MM/YYYY' },
    { key: 'YYYY/MM', label: 'YYYY/MM' },
    { key: 'DD/MM', label: 'DD/MM' },
    { key: 'MM/DD', label: 'MM/DD' },
    { key: 'YYYY/MM/DD HH:mm', label: 'YYYY/MM/DD HH:mm' },
    { key: 'YYYY/MM/DD HH:mm a', label: 'YYYY/MM/DD HH:mm a' },
]

export const TypesOfMoney = [
    { key: '$', label: '$' },
    { key: '€', label: '€' },
    { key: '¥', label: '¥' },
    { key: '£', label: '£' },
    { key: '₹', label: '₹' },
    { key: '₩', label: '₩' },
    { key: '₪', label: '₪' },
    { key: '元', label: '元' },
]

export const itemsTypesColumns = [
    { key: 'number', icon: '#', label: 'Número', hasSubmenu: false, items: null },
    { key: 'date', icon: '📅', label: 'Fecha', hasSubmenu: true, items: TypesOfDates },
    { key: 'country', icon: '🌍', label: 'País', hasSubmenu: false, items: null },
    { key: 'boolean', icon: '👍', label: 'Booleano', hasSubmenu: false, items: null },
    { key: 'category', icon: '🎉', label: 'Categoría', hasSubmenu: false, items: null },
    { key: 'money', icon: '$', label: 'Dinero', hasSubmenu: true, items: TypesOfMoney }
]