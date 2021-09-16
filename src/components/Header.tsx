import { Box } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { Logo } from '@guardian/src-ed-logo';
import { brand, space } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import React from 'react';

const floatRight = css`
	/**
    If you're here wanting to add more items to the Header then consider
    removing this and using flex for positioning instead
  */
	float: right;
`;

const bottomMarginStyles = css`
	margin-bottom: ${space[1]}px;
	${from.tablet} {
		margin-bottom: ${space[2]}px;
	}
	${from.desktop} {
		margin-bottom: ${space[4]}px;
	}
`;

const topMarginStyles = css`
	margin-top: ${space[2]}px;
	${from.tablet} {
		margin-top: ${space[2]}px;
	}
	${from.desktop} {
		margin-top: ${space[3]}px;
	}
`;

const rightMarginStyles = css`
	margin-right: ${space[3]}px;
	${from.mobileLandscape} {
		margin-right: ${space[5]}px;
	}
	${from.wide} {
		margin-right: ${space[24]}px;
	}
`;

const backgroundColor = css`
	background-color: ${brand[400]};
`;

export const Header = () => (
	<header id="top">
		<Box sidePadding={false} bg="blue">
			<div
				css={[
					floatRight,
					topMarginStyles,
					rightMarginStyles,
					bottomMarginStyles,
				]}
			>
				<Logo logoType="standard" />
			</div>
		</Box>
	</header>
);
