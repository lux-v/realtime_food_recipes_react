import theme1 from '../../../assets/scss/_theme1.module.scss';
import theme2 from '../../../assets/scss/_theme2.module.scss';
import theme3 from '../../../assets/scss/_theme3.module.scss';
import theme4 from '../../../assets/scss/_theme4.module.scss';
import theme5 from '../../../assets/scss/_theme5.module.scss';
import generalStyles from '../../../assets/scss/_general.module.scss';

const Palette = (presetColor, mode) => {
    let colors = { ...theme1, ...generalStyles };

    switch (presetColor) {
        case "theme1":
            colors = { mode: mode, ...theme1, ...generalStyles };
            break;
        case "theme2":
            colors = { mode: mode, ...theme2, ...generalStyles };
            break;
        case "theme3":
            colors = { mode: mode, ...theme3, ...generalStyles };
            break;
        case "theme4":
            colors = { mode: mode, ...theme4, ...generalStyles };
            break;
        case "theme5":
            colors = { mode: mode, ...theme5, ...generalStyles };
            break;

        default:
            colors = { mode: mode, ...theme1, ...generalStyles };
    }
    return colors;
}

export default Palette;