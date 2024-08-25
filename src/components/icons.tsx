import React from 'react';
import { SvgProps } from 'react-native-svg';
import IconHome from '@assets/icons/HomeIcon.svg';
import ANB from '@assets/icons/anb.svg';
import PinOutline from '@assets/icons/Pin_Outline.svg';
import PinFill from '@assets/icons/PinFill.svg';
import CheckIcon from '@assets/icons/check.svg';
import DateIcon from '@assets/icons/Date.svg';
import TrashIcon from '@assets/icons/TrashIcon.svg';
import TrashDeleteIcon from '@assets/icons/TrashDelete.svg';
import EyeOffIcon from '@assets/icons/eyeClose.svg';
import EyeOpenIcon from '@assets/icons/eyeOpen.svg';
import PeopleIcon from '@assets/icons/people.svg';
import StatisticsIcon from '@assets/icons/statis.svg';
import searchIcon from '@assets/icons/searchIcon.svg';
import FilterIcon from '@assets/icons/Filter.svg';
import ContactUsIcon from '@assets/icons/ContactUsIcon.svg';
import AboutAnbIcon from '@assets/icons/AboutanbIcon.svg';
import MoreIcon from '@assets/icons/MoreIcon.svg';
import BGImage from '@assets/icons/BGImage.svg';
import XIcon from '@assets/icons/XIcon.svg';
import AttachIcon from '@assets/icons/AttachIcon.svg';

import NoResultsIcon from '@assets/icons/NoResult.svg';
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
    Date: DateIcon,
    Trash: TrashIcon,
    EyeOff: EyeOffIcon,
    EyeOpen: EyeOpenIcon,
    People: PeopleIcon,
    Statistics: StatisticsIcon,
    Delete: TrashDeleteIcon,
    Check: CheckIcon,
    search: searchIcon,
    Filter: FilterIcon,
    ContactUs: ContactUsIcon,
    AboutAnb: AboutAnbIcon,
    NoResults: NoResultsIcon,
    More: MoreIcon,
    BGImage: BGImage,
    XIcon: XIcon,
    AttachIcon: AttachIcon,
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
