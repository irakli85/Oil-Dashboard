import React from 'react'
import styled from 'styled-components'

const CategoryHeader = ({ title, description, icon, preserveIconColors = false }) => (
  <Header>
    <IconFrame aria-hidden='true'>
      <Icon src={icon} alt='' $preserveColors={preserveIconColors} />
    </IconFrame>
    <HeaderText>
      <Title>{title}</Title>
      {description && <Description>{description}</Description>}
    </HeaderText>
  </Header>
)

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 2rem;
  width: 100%;
  min-height: 13rem;
  margin-bottom: 1.8rem;
  padding: 2.2rem 2.6rem;
  border-radius: 1.5rem;
  background: linear-gradient(135deg, #1aac83 0%, #0c5d47 100%);

  @media (max-width: 560px) {
    gap: 1.3rem;
    min-height: 0;
    padding: 1.7rem 1.5rem;
    border-radius: 1.2rem;
  }
`

const IconFrame = styled.div`
  display: grid;
  width: 7rem;
  height: 7rem;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);

  @media (max-width: 560px) {
    width: 5.5rem;
    height: 5.5rem;
  }
`

const Icon = styled.img`
  display: block;
  width: 5.2rem;
  height: 5.2rem;
  object-fit: contain;
  filter: ${({ $preserveColors }) => $preserveColors
    ? 'none'
    : 'brightness(0) saturate(100%) invert(34%) sepia(47%) saturate(960%) hue-rotate(107deg) brightness(89%) contrast(94%)'};

  @media (max-width: 560px) {
    width: 4.2rem;
    height: 4.2rem;
  }
`

const HeaderText = styled.div`
  min-width: 0;
`

const Title = styled.h1`
  margin: 0;
  color: #fff;
  font-size: 2.7rem;
  font-weight: 800;
  line-height: 1.3;

  @media (max-width: 560px) {
    font-size: 2.3rem;
  }
`

const Description = styled.p`
  margin: 0.7rem 0 0;
  color: rgba(255, 255, 255, 0.88);
  font-size: 1.45rem;
  line-height: 1.6;

  @media (max-width: 560px) {
    font-size: 1.35rem;
  }
`

export default CategoryHeader
