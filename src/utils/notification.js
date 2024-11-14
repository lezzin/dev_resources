import { Notify } from 'quasar';
import { Dark } from 'quasar';

export const notifyUser = (message, type = 'default') => {
    const isDarkMode = Dark.isActive;

    const NOTIFICATION_BACKGROUND_COLORS = {
        error: isDarkMode ? 'red-10' : 'red',
        success: isDarkMode ? 'green-10' : 'green',
        default: isDarkMode ? 'grey-10' : 'grey-1'
    };

    const NOTIFICATION_ICONS = {
        error: 'error',
        success: 'check_circle',
        default: 'warning'
    };

    Notify.create({
        progress: true,
        message,
        color: NOTIFICATION_BACKGROUND_COLORS[type] || NOTIFICATION_BACKGROUND_COLORS.default,
        icon: NOTIFICATION_ICONS[type] || NOTIFICATION_ICONS.default,
    });
}
