import React from 'react';
import { SvgProps } from 'react-native-svg';
import IconHome from '@assets/icons/Home.svg';
import ANB from '@assets/icons/anb.svg';
import PinOutline from '@assets/icons/Pin_Outline.svg';
import PinFill from '@assets/icons/PinFill.svg';
import CheckIcon from '@assets/icons/check.svg';
import ChechboxIcon from '@assets/icons/Checkbox.svg';
import DateIcon from '@assets/icons/Date.svg';
import TrashIcon from '@assets/icons/Trash.svg';
import TrashDeleteIcon from '@assets/icons/TrashDelete.svg';
import EyeOffIcon from '@assets/icons/eyeClose.svg';
import EyeOpenIcon from '@assets/icons/eyeOpen.svg';
import PeopleIcon from '@assets/icons/people.svg';
import StatisticsIcon from '@assets/icons/statis.svg';
import searchIcon from '@assets/icons/searchIcon.svg';
import { ViewStyle } from 'react-native';

type IconsProps = {
    name: string;
    width?: number;
    height?: number;
    fill?: string;
    style?: ViewStyle;
};

const iconMap: { [key: string]: React.FC<SvgProps> } = {
    Home: IconHome,
    anb: ANB,
    PinOutline: PinOutline,
    PinFill: PinFill,
    Checkbox: ChechboxIcon,
    Date: DateIcon,
    Trash: TrashIcon,
    EyeOff: EyeOffIcon,
    EyeOpen: EyeOpenIcon,
    People: PeopleIcon,
    Statistics: StatisticsIcon,
    Delete: TrashDeleteIcon,
    Check: CheckIcon,
    search: searchIcon
};

const Icons: React.FC<IconsProps> = ({ name, width = 24, height = 24, fill = 'white', style }) => {
    const SelectedIcon = iconMap[name];

    if (!SelectedIcon) {
        console.error(`Icon with name "${name}" not found.`);
        return null;
    }

    return <SelectedIcon width={width} height={height} fill={fill} style={style as any} />;
};

export default Icons;
