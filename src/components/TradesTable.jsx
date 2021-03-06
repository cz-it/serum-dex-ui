import { Col, Row } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { useMarket, useTrades } from '../utils/markets';
import FloatingElement from './layout/FloatingElement';

const Title = styled.div`
  color: rgba(255, 255, 255, 1);
`;
const SizeTitle = styled(Row)`
  padding: 20px 0 14px;
  color: #434a59;
`;

// TODO: Put in some scrolling
const TradesContainer = styled.div`
  height: calc(100% - 75px);
  margin-right: -20px;
  padding-right: 5px;
  overflow-y: scroll;
`;

export default function PublicTrades({ smallScreen }) {
  const { baseCurrency, quoteCurrency } = useMarket();
  const trades = useTrades();
  return (
    <FloatingElement
      style={
        smallScreen
          ? { flex: 1 }
          : { marginTop: '10px', height: 'calc(100% - 520px)' }
      }
    >
      <Title>Market trades</Title>
      <SizeTitle>
        <Col span={12} style={{ textAlign: 'left' }}>
          Size ({baseCurrency})
        </Col>
        <Col span={12} style={{ textAlign: 'right' }}>
          Price ({quoteCurrency}){' '}
        </Col>
      </SizeTitle>
      {!!trades && (
        <TradesContainer>
          {trades.map((trade, i) => (
            <Row key={i} style={{ marginBottom: 4 }}>
              <Col span={12} style={{ textAlign: 'left' }}>
                {trade.size}
              </Col>
              <Col
                span={12}
                style={{
                  textAlign: 'right',
                  color: trade.side === 'buy' ? '#41C77A' : '#F23B69',
                }}
              >
                {trade.price}
              </Col>
            </Row>
          ))}
        </TradesContainer>
      )}
    </FloatingElement>
  );
}
