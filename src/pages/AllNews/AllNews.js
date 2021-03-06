import React from 'react';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import SectionContainer from '../../components/SectionContainer/SectionContainer';
import SectionDivider from '../../components/SectionDivider/SectionDivider';
import Loading from '../Loading/Loading';

import AllNewsLogic from './AllNewsLogic';
import NewsCardsHolder from '../../components/NewsCardsHolder/NewsCardsHolder';
import PageButton from '../../components/PageButton/PageButton';

// The all news page 'https://cttbernex.ch/actualite'
function AllNews() {
  const { pageStatus, mod, newsList } = AllNewsLogic();

  if (pageStatus === 'loading') return <Loading />;
  return (
    <>
      <Navbar />
      <SectionDivider />
      <SectionContainer>
        <NewsCardsHolder newsList={newsList} />
      </SectionContainer>
      {mod && <PageButton text='Nouvelle news' to='/actualite/nouvelle' />}
      <Footer />
    </>
  );
}

export default AllNews;
