import theme1 from '../../../assets/scss/_theme1.module.scss';
import theme2 from '../../../assets/scss/_theme2.module.scss';
import theme3 from '../../../assets/scss/_theme3.module.scss';
import generalStyles from '../../../assets/scss/_general.module.scss';

const Palette = (presetColor) => {
    let colors = { ...theme1, ...generalStyles };


    switch (presetColor) {
        case "theme1":
            colors = { ...theme1, ...generalStyles };
            break;
        case "theme2":
            colors = { ...theme2, ...generalStyles };
            break;
        case "theme3":
            colors = { ...theme3, ...generalStyles };
            break;

        default:
            colors = { ...theme1, ...generalStyles };
    }



    return colors;
}

export default Palette;