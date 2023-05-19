import theme1 from '../../../assets/scss/_theme1.module.scss';
import theme2 from '../../../assets/scss/_theme2.module.scss';
import generalStyles from '../../../assets/scss/_general.module.scss';

const Palette = (presetColor) => {

    let colors = { ...theme1, ...generalStyles };
    if (presetColor === "theme2") {
        colors = { ...theme2, ...generalStyles };
    }

    return colors;
}

export default Palette;