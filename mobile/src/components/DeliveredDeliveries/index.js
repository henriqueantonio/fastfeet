import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';

import Delivery from '~/components/Delivery';
import Empty from '~/components/Empty';

import api from '~/services/api';

export default function DeliveredDeliveries({
  profile,
  isFocused,
  navigation,
}) {
  const [feed, setFeed] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  async function loadPage(pageNumber = page, shouldRefresh = false) {
    if (total && pageNumber > total) return;
    if (loading) return;

    setLoading(true);

    const response = await api.get(
      `/deliverymen/${profile}/deliveries?delivered=true&page=${pageNumber}`
    );

    const { rows, count } = response.data;

    setLoading(false);

    setTotal(count);
    setPage(pageNumber + 1);

    setFeed(shouldRefresh ? rows : [...feed, ...rows]);
  }

  useEffect(() => {
    loadPage();
  }, []); // eslint-disable-line

  async function refreshList() {
    setRefreshing(true);
    await loadPage(1, true);
    setRefreshing(false);
  }

  useEffect(() => {
    if (isFocused) {
      refreshList();
    }
  }, [isFocused]); // eslint-disable-line

  return (
    <>
      {feed.length !== 0 ? (
        <FlatList
          style={{ flex: 1 }}
          data={feed}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Delivery navigation={navigation} item={item} />
          )}
          onRefresh={refreshList}
          refreshing={refreshing}
          onEndReached={() => loadPage()}
          onEndReachedThreshold={0.1}
        />
      ) : (
        <Empty />
      )}
    </>
  );
}

DeliveredDeliveries.propTypes = {
  profile: PropTypes.number.isRequired,
};
