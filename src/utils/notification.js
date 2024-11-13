import { Notify } from 'quasar';
import { Dark } from 'quasar';

export const notifyUser = (message, type) => {
    const COLORS = {
        'error': Dark.isActive ? 'red-10' : 'red',
        'success': Dark.isActive ? 'green-10' : 'green'
    };

    const ICONS = {
        'error': 'error',
        'success': 'check_circle'
    };

    Notify.create({
        message: message,
        color: COLORS[type],
        icon: ICONS[type],
    });
}