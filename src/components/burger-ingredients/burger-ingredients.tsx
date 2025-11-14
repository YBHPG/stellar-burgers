import { useState, useRef, useEffect, FC } from 'react';
import { useInView } from 'react-intersection-observer';

import { TTabMode } from '@utils-types';
import { BurgerIngredientsUI } from '../ui/burger-ingredients';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui';

export const BurgerIngredients: FC = () => {
    const { items: allIngredients, isLoading: isPending, error: fetchError } = useSelector((globalState) => globalState.ingredients);

    const bunItems = allIngredients.filter((item) => item.type  ===  'bun');
    const mainItems = allIngredients.filter((item) => item.type  ===  'main');
    const sauceItems = allIngredients.filter((item) => item.type  ===  'sauce');

    const [activeTab, setActiveTab] = useState<TTabMode>('bun');
    const bunHeaderRef = useRef<HTMLHeadingElement>(null);
    const mainHeaderRef = useRef<HTMLHeadingElement>(null);
    const sauceHeaderRef = useRef<HTMLHeadingElement>(null);

    const [bunSectionRef, isBunSectionVisible] = useInView({ threshold: 0 });
    const [mainSectionRef, isMainSectionVisible] = useInView({ threshold: 0 });
    const [sauceSectionRef, isSauceSectionVisible] = useInView({ threshold: 0 });

    useEffect(() => {
        if (isBunSectionVisible) {
            setActiveTab('bun');
        } else if (isSauceSectionVisible) {
            setActiveTab('sauce');
        } else if (isMainSectionVisible) {
            setActiveTab('main');
        }
    }, [isBunSectionVisible, isMainSectionVisible, isSauceSectionVisible]);

    const handleTabSelect = (selectedTab: string) => {
        setActiveTab(selectedTab as TTabMode);
        switch (selectedTab) {
            case 'bun':
                bunHeaderRef.current?.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'main':
                mainHeaderRef.current?.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'sauce':
                sauceHeaderRef.current?.scrollIntoView({ behavior: 'smooth' });
                break;
        }
    };

    if (isPending) {
        return <Preloader />;
    }

    if (fetchError) {
        return <p style = {{ color: 'red' }}>Ошибка: {fetchError}</p>;
    }

    return (
        <BurgerIngredientsUI
            currentTab = {activeTab}
            buns = {bunItems}
            mains = {mainItems}
            sauces = {sauceItems}
            titleBunRef = {bunHeaderRef}
            titleMainRef = {mainHeaderRef}
            titleSaucesRef = {sauceHeaderRef}
            bunsRef = {bunSectionRef}
            mainsRef = {mainSectionRef}
            saucesRef = {sauceSectionRef}
            onTabClick = {handleTabSelect}
        />
    );
};
