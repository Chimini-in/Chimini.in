"use client";

import React, { useEffect, useState } from 'react';
import { supabaseClient } from '../../../lib/supabase';

const STATUS_COLORS = {
  pending: { bg: '#FFFBE6', border: '#FFE58F', text: '#D48806', label: 'Pending Confirmation' },
  confirmed: { bg: '#E6F7FF', border: '#91D5FF', text: '#096DD9', label: 'Confirmed & Preparing' },
  shipped: { bg: '#F9F0FF', border: '#D3ADF7', text: '#722ED1', label: 'Dispatched / In Transit' },
  delivered: { bg: '#F6FFED', border: '#B7EB8F', text: '#389E0D', label: 'Delivered' },
  cancelled: { bg: '#FFF1F0', border: '#FFA39E', text: '#CF1322', label: 'Cancelled' }
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [statusFeedback, setStatusFeedback] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      if (!supabaseClient) {
        setOrders([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabaseClient
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn("Could not fetch orders from Supabase:", error);
      } else {
        setOrders(data || []);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      if (supabaseClient) {
        const { error } = await supabaseClient
          .from('orders')
          .update({ status: newStatus })
          .eq('id', orderId);

        if (error) throw error;
      }

      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder(prev => ({ ...prev, status: newStatus }));
      }
      setStatusFeedback(`Order status updated to "${STATUS_COLORS[newStatus]?.label || newStatus}"`);
      setTimeout(() => setStatusFeedback(null), 3000);
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Could not update order status. Please check Supabase permissions.");
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    const q = searchQuery.toLowerCase();
    const matchesQuery = !searchQuery || 
      (order.order_id && order.order_id.toLowerCase().includes(q)) ||
      (order.customer_name && order.customer_name.toLowerCase().includes(q)) ||
      (order.customer_phone && order.customer_phone.includes(q)) ||
      (order.customer_email && order.customer_email.toLowerCase().includes(q));

    return matchesStatus && matchesQuery;
  });

  return (
    <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#1a1a1a', margin: 0 }}>
            Client Orders & Inquiries
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.88rem', marginTop: '4px' }}>
            Manage luxury concierge orders received via website and WhatsApp
          </p>
        </div>
        <button
          onClick={fetchOrders}
          style={{
            padding: '10px 18px',
            backgroundColor: '#ffffff',
            border: '1px solid #cbd5e1',
            borderRadius: '6px',
            fontSize: '0.85rem',
            cursor: 'pointer',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>🔄 Refresh Orders</span>
        </button>
      </div>

      {statusFeedback && (
        <div style={{
          padding: '12px 16px',
          backgroundColor: '#F6FFED',
          border: '1px solid #B7EB8F',
          borderRadius: '6px',
          color: '#389E0D',
          fontSize: '0.85rem',
          marginBottom: '20px'
        }}>
          ✨ {statusFeedback}
        </div>
      )}

      {/* Filters & Search */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '24px', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {['all', 'pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].map(status => {
            const count = status === 'all' ? orders.length : orders.filter(o => o.status === status).length;
            const isActive = selectedStatus === status;
            return (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '20px',
                  border: isActive ? '1px solid #1a1a1a' : '1px solid #e2e8f0',
                  backgroundColor: isActive ? '#1a1a1a' : '#ffffff',
                  color: isActive ? '#ffffff' : '#64748b',
                  fontSize: '0.82rem',
                  fontWeight: isActive ? '600' : '400',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)} ({count})
              </button>
            );
          })}
        </div>

        <input
          type="text"
          placeholder="Search by Order ID, Client Name, Phone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: '9px 14px',
            border: '1px solid #cbd5e1',
            borderRadius: '6px',
            fontSize: '0.85rem',
            minWidth: '280px',
            outline: 'none',
            backgroundColor: '#ffffff'
          }}
        />
      </div>

      {/* Orders Table */}
      {loading ? (
        <div style={{ padding: '60px', textAlign: 'center', color: '#64748b', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          Loading orders...
        </div>
      ) : filteredOrders.length === 0 ? (
        <div style={{ padding: '60px', textAlign: 'center', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>🛍️</div>
          <h3 style={{ margin: '0 0 6px 0', color: '#1a1a1a', fontSize: '1.1rem' }}>No orders found</h3>
          <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0 }}>
            {searchQuery || selectedStatus !== 'all' ? 'Try adjusting your filters or search terms.' : 'Orders placed on the storefront will appear here instantly.'}
          </p>
        </div>
      ) : (
        <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <th style={{ padding: '14px 18px' }}>Order Reference</th>
                  <th style={{ padding: '14px 18px' }}>Client</th>
                  <th style={{ padding: '14px 18px' }}>Items</th>
                  <th style={{ padding: '14px 18px' }}>Total Amount</th>
                  <th style={{ padding: '14px 18px' }}>Status</th>
                  <th style={{ padding: '14px 18px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => {
                  const items = Array.isArray(order.items) ? order.items : [];
                  const statusStyle = STATUS_COLORS[order.status] || STATUS_COLORS.pending;
                  const dateStr = order.created_at ? new Date(order.created_at).toLocaleDateString('en-IN', {
                    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                  }) : 'Recently';

                  return (
                    <tr key={order.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.15s' }}>
                      <td style={{ padding: '16px 18px' }}>
                        <div style={{ fontWeight: '600', color: '#0f172a' }}>#{order.order_id || order.id.slice(0, 8)}</div>
                        <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '2px' }}>{dateStr}</div>
                      </td>
                      <td style={{ padding: '16px 18px' }}>
                        <div style={{ fontWeight: '500', color: '#1e293b' }}>{order.customer_name || 'Anonymous Client'}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>{order.customer_phone}</div>
                        {order.customer_email && <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{order.customer_email}</div>}
                      </td>
                      <td style={{ padding: '16px 18px' }}>
                        <div style={{ color: '#334155', fontWeight: '500' }}>{items.length} item{items.length !== 1 ? 's' : ''}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '2px' }}>
                          {items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                        </div>
                      </td>
                      <td style={{ padding: '16px 18px' }}>
                        <div style={{ fontWeight: '700', color: '#0f172a' }}>₹{parseFloat(order.total_amount || 0).toLocaleString('en-IN')}</div>
                        {order.coupon_code && (
                          <span style={{ fontSize: '0.7rem', backgroundColor: '#F6FFED', color: '#389E0D', padding: '2px 6px', borderRadius: '4px', border: '1px solid #B7EB8F', marginTop: '4px', display: 'inline-block' }}>
                            🏷️ {order.coupon_code}
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '16px 18px' }}>
                        <select
                          value={order.status || 'pending'}
                          onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                          disabled={updatingId === order.id}
                          style={{
                            padding: '6px 10px',
                            borderRadius: '16px',
                            backgroundColor: statusStyle.bg,
                            border: `1px solid ${statusStyle.border}`,
                            color: statusStyle.text,
                            fontSize: '0.78rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            outline: 'none'
                          }}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td style={{ padding: '16px 18px', textAlign: 'right' }}>
                        <button
                          onClick={() => setSelectedOrder(order)}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: '#f1f5f9',
                            border: '1px solid #cbd5e1',
                            borderRadius: '6px',
                            fontSize: '0.8rem',
                            color: '#334155',
                            cursor: 'pointer',
                            fontWeight: '500'
                          }}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            maxWidth: '680px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '28px',
            position: 'relative',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          }}>
            <button
              onClick={() => setSelectedOrder(null)}
              style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#64748b'
              }}
            >
              &times;
            </button>

            <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '16px', marginBottom: '20px' }}>
              <span style={{ fontSize: '0.8rem', color: '#8C6A3D', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Order Summary
              </span>
              <h2 style={{ margin: '4px 0 0 0', fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#1a1a1a' }}>
                Order #{selectedOrder.order_id || selectedOrder.id.slice(0, 8)}
              </h2>
            </div>

            {/* Client & Shipping */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
              <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>
                  👤 Client Details
                </div>
                <div style={{ fontWeight: '600', color: '#1e293b' }}>{selectedOrder.customer_name}</div>
                <div style={{ fontSize: '0.85rem', color: '#475569', marginTop: '4px' }}>📞 {selectedOrder.customer_phone}</div>
                {selectedOrder.customer_email && <div style={{ fontSize: '0.85rem', color: '#475569' }}>✉️ {selectedOrder.customer_email}</div>}
              </div>

              <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>
                  📍 Shipping Destination
                </div>
                {selectedOrder.shipping_details ? (
                  <div style={{ fontSize: '0.85rem', color: '#334155', lineHeight: '1.4' }}>
                    <div>{selectedOrder.shipping_details.address1}</div>
                    {selectedOrder.shipping_details.address2 && <div>{selectedOrder.shipping_details.address2}</div>}
                    <div>{selectedOrder.shipping_details.city}, {selectedOrder.shipping_details.state} - {selectedOrder.shipping_details.pincode}</div>
                  </div>
                ) : (
                  <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>No address recorded</div>
                )}
              </div>
            </div>

            {/* Items */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', marginBottom: '12px' }}>
                🛍️ Ordered Items
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {(Array.isArray(selectedOrder.items) ? selectedOrder.items : []).map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', backgroundColor: '#FAF8F5', borderRadius: '6px', border: '1px solid #EAE3D9' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {item.image && (
                        <img src={item.image} alt={item.name} style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} />
                      )}
                      <div>
                        <div style={{ fontWeight: '600', fontSize: '0.88rem', color: '#2C221E' }}>{item.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#8C827A' }}>Qty: {item.quantity} · Scent: {item.scent || item.name}</div>
                      </div>
                    </div>
                    <div style={{ fontWeight: '600', fontSize: '0.9rem', color: '#2C221E' }}>
                      ₹{parseFloat(item.price || 0) * (item.quantity || 1)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Totals Breakdown */}
            <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#64748b', marginBottom: '6px' }}>
                <span>Subtotal</span>
                <span>₹{parseFloat(selectedOrder.subtotal || selectedOrder.total_amount || 0).toLocaleString('en-IN')}</span>
              </div>
              {selectedOrder.discount_amount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#389E0D', marginBottom: '6px' }}>
                  <span>Coupon Discount ({selectedOrder.coupon_code})</span>
                  <span>-₹{parseFloat(selectedOrder.discount_amount).toLocaleString('en-IN')}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>
                <span>Shipping</span>
                <span>Complimentary (₹0)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: '700', color: '#0f172a', borderTop: '1px dashed #cbd5e1', paddingTop: '8px' }}>
                <span>Total Amount</span>
                <span>₹{parseFloat(selectedOrder.total_amount || 0).toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {selectedOrder.customer_phone && (
                <a
                  href={`https://wa.me/${selectedOrder.customer_phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${selectedOrder.customer_name}, thank you for choosing Chimini! Regarding your order #${selectedOrder.order_id || selectedOrder.id.slice(0, 8)}...`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex: 1,
                    padding: '12px',
                    backgroundColor: '#25D366',
                    color: '#ffffff',
                    textAlign: 'center',
                    borderRadius: '6px',
                    fontWeight: '600',
                    fontSize: '0.85rem',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  💬 Chat with Client on WhatsApp
                </a>
              )}
              <button
                onClick={() => setSelectedOrder(null)}
                style={{
                  padding: '12px 20px',
                  backgroundColor: '#f1f5f9',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
