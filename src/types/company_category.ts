export interface Shortcut {
    shortcut: string;
    category: string;
}

export const COMPANY_TYPES: Shortcut[] = [
    { shortcut: 'PF', category: 'Pflege' },
    { shortcut: 'KH', category: 'Krankenhaus' },
    { shortcut: 'PRO', category: 'Produktion' },
    { shortcut: 'RET', category: 'Retail' },
    { shortcut: 'BA', category: 'Bank' },
    { shortcut: 'ÖFF', category: 'Öffentlicher Dienst (Stadt/ Landkreis)' },
    { shortcut: 'IND', category: 'Industrie' },
    { shortcut: 'PER', category: 'Personaldienstleister' },
    { shortcut: 'SER', category: 'Service' },
    { shortcut: 'BIL', category: 'Bildung' },
    { shortcut: 'VER', category: 'Versicherung' },
    { shortcut: 'LOG', category: 'Logistik' },
    { shortcut: 'AGT', category: 'Agentur' },
    { shortcut: 'STU', category: 'Start Up' },
    { shortcut: '???', category: 'Nicht sicher' },
];  