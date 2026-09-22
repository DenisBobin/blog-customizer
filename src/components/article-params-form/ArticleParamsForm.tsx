import { useState, useRef } from 'react';
import {
  fontFamilyOptions,
  defaultArticleState,
  type OptionType,
  type ArticleStateType,
  fontSizeOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { Separator } from 'src/ui/separator';

import type { Dispatch, SetStateAction } from 'react';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  setArticleState: Dispatch<SetStateAction<ArticleStateType>>;
};

export const ArticleParamsForm = ({
  setArticleState,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const asideRef = useRef<HTMLElement>(null);

  useOutsideClickClose({
    isOpen,
    rootRef: asideRef,
    onChange: setIsOpen,
  });

  const [fontFamily, setFontFamily] = useState<OptionType>(
    defaultArticleState.fontFamilyOption
  );

  const [fontSize, setFontSize] = useState<OptionType>(
    defaultArticleState.fontSizeOption
  );

  const [fontColor, setFontColor] = useState<OptionType>(defaultArticleState.fontColor);

  const [backgroundColor, setBackgroundColor] = useState<OptionType>(
    defaultArticleState.backgroundColor
  );

  const [contentWidth, setContentWidth] = useState<OptionType>(
    defaultArticleState.contentWidth
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    setArticleState({
      fontFamilyOption: fontFamily,
      fontSizeOption: fontSize,
      fontColor: fontColor,
      backgroundColor: backgroundColor,
      contentWidth: contentWidth,
    });
  };

  const handleReset = (): void => {
    setFontFamily(defaultArticleState.fontFamilyOption);
    setFontSize(defaultArticleState.fontSizeOption);
    setFontColor(defaultArticleState.fontColor);
    setBackgroundColor(defaultArticleState.backgroundColor);
    setContentWidth(defaultArticleState.contentWidth);

    setArticleState(defaultArticleState);
  };

  return (
    <>
      <ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      <aside
        ref={asideRef}
        className={`${styles.container} ${isOpen ? styles.container_open : ''}`}
      >
        <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
          <Select
            selected={fontFamily}
            options={fontFamilyOptions}
            onChange={setFontFamily}
            title="Шрифт"
          />
          <RadioGroup
            name="fontSize"
            selected={fontSize}
            options={fontSizeOptions}
            onChange={setFontSize}
            title="Размер шрифта"
          />
          <Select
            selected={fontColor}
            options={fontColors}
            onChange={setFontColor}
            title="Цвет шрифта"
          />

          <Separator />

          <Select
            selected={backgroundColor}
            options={backgroundColors}
            onChange={setBackgroundColor}
            title="Цвет фона"
          />

          <Select
            selected={contentWidth}
            options={contentWidthArr}
            onChange={setContentWidth}
            title="Ширина контента"
          />
          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </>
  );
};
