"use client";
import React, { useState, useEffect } from 'react';
import {
  Package,
  Calendar,
  ChevronRight,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  ShoppingBag,
  RefreshCw,
  Copy,
  Check,
  SlidersHorizontal,
} from 'lucide-react';

import { orderHistoryAPI } from '../../../../api/order/orderApi';

/* ── Status accent map ──────────────────────────────────────
   Complete class strings so Tailwind JIT can detect them.   */
const STATUS_ACCENT = {
  Pending:   { topBorder: 'border-t-amber-400',   dot: 'bg-amber-400',   pulse: true  },
  Confirmed: { topBorder: 'border-t-blue-500',     dot: 'bg-blue-500',    pulse: false },
  Shipped:   { topBorder: 'border-t-violet-500',   dot: 'bg-violet-500',  pulse: true  },
  Delivered: { topBorder: 'border-t-emerald-500',  dot: 'bg-emerald-500', pulse: false },
  Cancelled: { topBorder: 'border-t-rose-500',     dot: 'bg-rose-500',    pulse: false },
  Returned:  { topBorder: 'border-t-stone-400',    dot: 'bg-stone-400',   pulse: false },
};
const getAccent = (status) =>
  STATUS_ACCENT[status] || { topBorder: 'border-t-amber-400', dot: 'bg-amber-400', pulse: false };

/* ── Shimmer skeleton atom ──────────────────────────────── */
const Shimmer = ({ className = '' }) => (
  <div className={`relative overflow-hidden bg-stone-100 rounded-lg ${className}`}>
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
  </div>
);

export const OrderHistoryDetails = ({ onOrderClick }) => {
  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const [copiedId,setCopiedId]= useState(null);

  /* ── Data layer (all logic unchanged) ──────────────────── */
  const fetchOrderHistoryData = async () => {
    try {
      setLoading(true);
      setError(null);
      if (!orderHistoryAPI?.getOrderHistory)
        throw new Error('API function not available. Please check the import path.');
      const data = await orderHistoryAPI.getOrderHistory();
      setOrders(transformOrderData(data.orders || []));
    } catch (err) {
      console.error('Error fetching order history:', err);
      setError(err.message || 'Failed to load orders. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const transformOrderData = (apiOrders) => {
    if (!apiOrders || !Array.isArray(apiOrders)) return [];
    return apiOrders.map((order, index) => {
      const orderId       = order.orderId || `ORDER_${5913 + index}`;
      const orderDate     = new Date(order.placedAt);
      const formattedDate = formatDate(orderDate);
      const formattedValue= formatCurrency(order.totalAmount);
      const statusInfo    = determineOrderStatus(order.status);
      let productImages   = [];
      let productCount    = 0;
      if (order.items && Array.isArray(order.items)) {
        productCount = order.items.reduce((t, i) => t + (i.quantity || 1), 0);
        order.items.forEach(item => {
          if (item.productImage?.length > 0) productImages.push(item.productImage[0]);
        });
        productImages = productImages.slice(0, 4);
      }
      return { id: orderId, date: formattedDate, value: formattedValue,
        status: statusInfo.status, statusColor: statusInfo.statusColor,
        statusIcon: statusInfo.statusIcon, productImages, productCount,
        originalData: order, trackingId: order.trackingId || '', items: order.items || [] };
    });
  };

  const formatDate = (date) => {
    if (!(date instanceof Date) || isNaN(date)) return 'Invalid Date';
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year  = date.getFullYear();
    const sfx = (d) => { if (d>3&&d<21) return 'th'; switch(d%10){case 1:return 'st';case 2:return 'nd';case 3:return 'rd';default:return 'th';} };
    return `${day}${sfx(day)} ${month}, ${year}`;
  };

  const formatCurrency = (amount) =>
    typeof amount === 'number' ? amount.toLocaleString('en-IN') : '0';

  const determineOrderStatus = (status) => {
    const map = {
      Pending:   { status:'Pending',   statusColor:'bg-amber-50 text-amber-700 border-amber-200',   statusIcon:Clock        },
      Confirmed: { status:'Confirmed', statusColor:'bg-blue-50 text-blue-700 border-blue-200',      statusIcon:ShoppingBag  },
      Shipped:   { status:'Shipped',   statusColor:'bg-purple-50 text-purple-700 border-purple-200',statusIcon:Truck        },
      Delivered: { status:'Delivered', statusColor:'bg-green-50 text-green-700 border-green-200',   statusIcon:CheckCircle  },
      Cancelled: { status:'Cancelled', statusColor:'bg-red-50 text-red-700 border-red-200',         statusIcon:XCircle      },
      Returned:  { status:'Returned',  statusColor:'bg-gray-50 text-gray-700 border-gray-200',      statusIcon:XCircle      },
    };
    return map[status] || { status:'Processing', statusColor:'bg-amber-50 text-amber-700 border-amber-200', statusIcon:Clock };
  };

  const handleCopyOrderId = (orderId, e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(orderId).then(() => {
      setCopiedId(orderId);
      setTimeout(() => setCopiedId(null), 1500);
    }).catch(() => {});
  };

  useEffect(() => { fetchOrderHistoryData(); }, []);

  /* ══════════════════════════════════════════════════════════
     LOADING — shimmer skeleton
  ══════════════════════════════════════════════════════════ */
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] px-4 sm:px-6 lg:px-6 xl:px-8 pt-6 pb-12">
        <style>{`@keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(200%)}}`}</style>
        <div className="flex items-start justify-between mb-8">
          <div className="space-y-2">
            <Shimmer className="h-8 w-44 rounded-xl" />
            <Shimmer className="h-3.5 w-56" />
            <Shimmer className="h-[2px] w-10 mt-1 rounded-full" />
          </div>
          <div className="flex items-center gap-2 mt-1">
            <Shimmer className="w-8 h-8 rounded-lg" />
            <Shimmer className="w-8 h-8 rounded-lg" />
            <Shimmer className="w-20 h-7 rounded-full" />
          </div>
        </div>
        <div className="lg:hidden space-y-4">
          {[1,2,3].map(i => (
            <div key={i} className="bg-white rounded-[20px] overflow-hidden border border-stone-100/60"
              style={{ boxShadow:'0 2px 8px rgba(0,0,0,0.04),0 8px 24px rgba(0,0,0,0.07)', animationDelay:`${(i-1)*100}ms` }}>
              <Shimmer className="h-0.5 w-full rounded-none" />
              <div className="px-5 pt-4 pb-3 flex items-center justify-between">
                <Shimmer className="h-3.5 w-36" />
                <Shimmer className="h-3 w-20" />
              </div>
              <div className="px-5 pb-4 flex gap-2.5">
                {[1,2,3].map(j => <Shimmer key={j} className="w-16 h-16 rounded-xl" />)}
              </div>
              <div className="h-px mx-5 bg-stone-50" />
              <div className="px-5 py-3.5 flex items-center justify-between">
                <Shimmer className="h-4 w-28" />
                <Shimmer className="h-5 w-20" />
              </div>
              <div className="h-px bg-stone-50" />
              <div className="px-5 py-3 flex items-center justify-between">
                <Shimmer className="h-3.5 w-24" />
                <Shimmer className="w-5 h-5 rounded" />
              </div>
            </div>
          ))}
        </div>
        <div className="hidden lg:block">
          <div className="h-9 mb-3" />
          <div className="space-y-2.5">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="bg-white rounded-2xl border border-stone-100/60 overflow-hidden"
                style={{ boxShadow:'0 1px 3px rgba(0,0,0,0.04),0 4px 8px rgba(0,0,0,0.04)', animationDelay:`${(i-1)*70}ms` }}>
                <div className="grid grid-cols-12 gap-4 py-5 pl-8 pr-6 items-center">
                  <div className="col-span-4 flex items-center gap-3.5">
                    <div className="flex -space-x-3">
                      <Shimmer className="w-12 h-12 rounded-xl" />
                      <Shimmer className="w-12 h-12 rounded-xl opacity-70" />
                    </div>
                    <div className="space-y-1.5">
                      <Shimmer className="h-3.5 w-28" />
                      <Shimmer className="h-3 w-16 opacity-60" />
                    </div>
                  </div>
                  <div className="col-span-2"><Shimmer className="h-4 w-20" /></div>
                  <div className="col-span-3"><Shimmer className="h-4 w-28" /></div>
                  <div className="col-span-2"><Shimmer className="h-5 w-16" /></div>
                  <div className="col-span-1 flex justify-end"><Shimmer className="w-9 h-9 rounded-xl" /></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center px-6">
        <div className="text-center max-w-[280px]">
          <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-rose-100">
            <XCircle className="w-7 h-7 text-rose-600" />
          </div>
          <h3 className="text-[15px] font-bold text-stone-900 mb-2 tracking-tight">Couldn't load orders</h3>
          <p className="text-[13px] text-stone-500 mb-7 leading-relaxed">{error}</p>
          <button onClick={fetchOrderHistoryData}
            className="bg-red-800 text-white px-6 py-2.5 rounded-xl text-sm font-semibold inline-flex items-center gap-2 shadow-md shadow-red-800/20 hover:bg-red-900 active:scale-[0.98] transition-all duration-150">
            <RefreshCw className="w-3.5 h-3.5" /> Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF9] relative overflow-x-hidden">
      <style>{`@keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(200%)}}`}</style>
      
      {/* Ambient glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-rose-100/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-32 w-80 h-80 bg-amber-50/15 rounded-full blur-3xl" />
      </div>

      <div className="relative px-4 sm:px-6 lg:px-6 xl:px-8 pt-6 pb-12">

        {/* Page Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl lg:text-[28px] xl:text-3xl font-bold text-stone-900 tracking-tight leading-tight">
              Order History
            </h1>
            <p className="text-[13px] text-stone-400 mt-1 leading-snug">
              <span className="lg:hidden">Track and manage your purchases</span>
              <span className="hidden lg:inline">All your purchases, beautifully organized</span>
            </p>
            <div className="mt-3 h-[2px] w-10 bg-gradient-to-r from-red-800 to-red-400 rounded-full" />
          </div>
          <div className="flex items-center gap-2 mt-1 flex-shrink-0">
            {orders.length > 0 && (
              <span className="hidden sm:inline-flex text-[11px] font-semibold bg-red-50 text-red-800 border border-red-100 px-2.5 py-1 rounded-full tracking-wide">
                {orders.length} {orders.length === 1 ? 'order' : 'orders'}
              </span>
            )}
            <button title="Filter & Sort"
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-stone-200 text-stone-500 hover:text-red-800 hover:border-red-200 hover:bg-red-50 transition-all duration-150 shadow-sm">
              <SlidersHorizontal className="w-3.5 h-3.5" />
            </button>
            <button onClick={fetchOrderHistoryData} title="Refresh"
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-stone-200 text-stone-500 hover:text-stone-700 hover:border-stone-300 transition-all duration-150 shadow-sm">
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 text-center px-6">
            <div className="relative mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-stone-100 to-stone-50 rounded-3xl flex items-center justify-center shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-stone-100">
                <Package className="w-10 h-10 text-stone-300" />
              </div>
              <div className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-red-50 rounded-lg border border-red-100 flex items-center justify-center">
                <span className="text-red-400 text-[10px] font-bold">0</span>
              </div>
            </div>
            <h3 className="text-[16px] font-bold text-stone-800 mb-2 tracking-tight">No orders yet</h3>
            <p className="text-[13px] text-stone-400 leading-relaxed max-w-[200px]">
              You haven't placed any orders yet. Explore our collection to get started.
            </p>
          </div>
        ) : (
          <>
            {/* MODERN MOBILE VIEW - COMPACT & STYLISH */}
            <div className="lg:hidden space-y-3">
              {orders.map((order) => {
                const accent = getAccent(order.status);
                return (
                  <div
                    key={order.id}
                    onClick={() => onOrderClick?.(order)}
                    className="bg-white rounded-2xl overflow-hidden border border-stone-100/80 active:scale-[0.98] transition-all duration-200"
                    style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.03), 0 1px 2px rgba(0,0,0,0.05)' }}
                  >
                    {/* Top status bar - subtle */}
                    <div className={`h-1 w-full ${accent.dot.replace('bg-', 'bg-')} opacity-80`} />
                    
                    <div className="p-4">
                      {/* Row 1: Order ID + Copy + Item Count */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 min-w-0">
                          <Package className="w-3.5 h-3.5 text-red-700 flex-shrink-0" />
                          <span className="text-[11px] font-mono font-semibold text-stone-700 truncate">
                            {order.id}
                          </span>
                          <button
                            onClick={(e) => handleCopyOrderId(order.id, e)}
                            className="flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-all"
                          >
                            {copiedId === order.id
                              ? <Check className="w-3 h-3 text-emerald-500" />
                              : <Copy className="w-3 h-3" />}
                          </button>
                        </div>
                        <span className="text-[10px] font-medium text-stone-400 bg-stone-100 px-2 py-1 rounded-full">
                          {order.productCount} {order.productCount === 1 ? 'item' : 'items'}
                        </span>
                      </div>

                      {/* Row 2: Product Images + Status + Price - COMPACT LAYOUT */}
                      <div className="flex items-center gap-3">
                        {/* Product Images - MODERN OVERLAPPING DESIGN */}
                        <div className="flex-shrink-0 relative h-16 w-16">
                          {order.productImages.length > 0 ? (
                            <div className="relative w-full h-full">
                              {order.productImages.slice(0, 3).map((img, i) => (
                                <div
                                  key={i}
                                  className={`absolute w-14 h-14 rounded-xl overflow-hidden border-2 border-white shadow-md transition-all duration-200 hover:scale-105`}
                                  style={{
                                    left: `${i * 10}px`,
                                    top: `${i * 4}px`,
                                    zIndex: 3 - i,
                                    transform: `rotate(${i * -2}deg)`,
                                  }}
                                >
                                  <img
                                    src={img}
                                    alt={`Product ${i + 1}`}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.style.display = 'none';
                                      e.target.parentElement.innerHTML = `
                                        <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-rose-50 to-stone-50">
                                          <span class="text-red-800 font-bold text-xs">${i + 1}</span>
                                        </div>
                                      `;
                                    }}
                                  />
                                </div>
                              ))}
                              {order.productCount > 3 && (
                                <div
                                  className="absolute w-14 h-14 rounded-xl border-2 border-white bg-gradient-to-br from-stone-100 to-stone-200 flex items-center justify-center shadow-md"
                                  style={{
                                    left: '30px',
                                    top: '12px',
                                    zIndex: 0,
                                  }}
                                >
                                  <span className="text-[11px] font-bold text-stone-600">+{order.productCount - 3}</span>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-rose-50 to-stone-50 flex items-center justify-center border-2 border-white shadow-md">
                              <Package className="w-6 h-6 text-red-700/60" />
                            </div>
                          )}
                        </div>

                        {/* Middle Section: Status + Date */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className={`w-1.5 h-1.5 rounded-full ${accent.dot} ${accent.pulse ? 'animate-pulse' : ''}`} />
                            <span className="text-[12px] font-semibold text-stone-700">{order.status}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-stone-400">
                            <Calendar className="w-3 h-3" />
                            <span className="text-[10px] font-medium truncate">{order.date}</span>
                          </div>
                        </div>

                        {/* Right Section: Price + Arrow */}
                        <div className="flex-shrink-0 flex items-center gap-1">
                          <div className="text-right">
                            <span className="text-[10px] font-medium text-stone-400">₹</span>
                            <span className="text-[15px] font-bold text-stone-900 ml-0.5">{order.value}</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-stone-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* DESKTOP VIEW - Unchanged */}
            <div className="hidden lg:block">
              <div className="grid grid-cols-12 gap-4 py-2.5 px-8 xl:px-9 mb-3">
                {['PRODUCT', 'STATUS', 'DATE', 'TOTAL', ''].map((label, i) => {
                  const span = [4, 2, 3, 2, 1][i];
                  return (
                    <div key={label} className={`col-span-${span} text-[10px] font-bold text-stone-400 uppercase tracking-widest ${i === 4 ? 'text-right' : ''}`}>
                      {label}
                    </div>
                  );
                })}
              </div>
              <div className="space-y-2.5">
                {orders.map((order) => {
                  const accent = getAccent(order.status);
                  return (
                    <div
                      key={order.id}
                      className="group relative bg-white rounded-2xl overflow-hidden border border-stone-100/60 cursor-pointer transition-all duration-200 hover:-translate-y-[2px]"
                      style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 8px rgba(0,0,0,0.04)' }}
                      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04), 0 4px 8px rgba(0,0,0,0.04)'; }}
                      onClick={() => onOrderClick?.(order)}
                    >
                      <div className={`absolute left-0 top-1/2 -translate-y-1/2 h-9 w-[3px] rounded-r-full ${accent.dot}`} />
                      <div className="grid grid-cols-12 gap-4 py-5 xl:py-6 pl-8 pr-6 xl:pl-9 xl:pr-7 items-center">
                        <div className="col-span-4 flex items-center gap-3.5">
                          {order.productImages.length > 0 ? (
                            <div className="flex -space-x-3 flex-shrink-0">
                              {order.productImages.slice(0, 3).map((img, i) => (
                                <div key={i}
                                  className="w-12 h-12 xl:w-[52px] xl:h-[52px] rounded-xl border-2 border-white overflow-hidden bg-stone-100"
                                  style={{ zIndex: 3-i, boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }}>
                                  <img src={img} alt={`Product ${i+1}`}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    onError={(e) => {
                                      e.target.onerror=null; e.target.style.display='none';
                                      e.target.parentElement.innerHTML=`<div class="w-full h-full flex items-center justify-center bg-rose-50"><span class="text-rose-900 font-bold text-xs">${i+1}</span></div>`;
                                    }} />
                                </div>
                              ))}
                              {order.productCount > 3 && (
                                <div className="w-12 h-12 rounded-xl border-2 border-white bg-stone-100 flex items-center justify-center text-[11px] font-bold text-stone-500"
                                  style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                                  +{order.productCount - 3}
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100/60 flex items-center justify-center flex-shrink-0">
                              <Package className="w-5 h-5 text-red-700" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <p className="text-[13px] font-semibold text-stone-900 truncate tracking-tight font-mono">
                                {order.id}
                              </p>
                              <button
                                onClick={(e) => handleCopyOrderId(order.id, e)}
                                title="Copy order ID"
                                className="flex-shrink-0 w-5 h-5 rounded flex items-center justify-center text-stone-300 hover:text-stone-600 hover:bg-stone-100 transition-all opacity-0 group-hover:opacity-100">
                                {copiedId === order.id
                                  ? <Check className="w-3 h-3 text-emerald-500" />
                                  : <Copy className="w-3 h-3" />}
                              </button>
                            </div>
                            <p className="text-[11px] text-stone-400 mt-0.5">
                              {order.productCount} item{order.productCount !== 1 ? 's' : ''}
                            </p>
                          </div>
                        </div>
                        <div className="col-span-2">
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${accent.dot}${accent.pulse ? ' animate-pulse' : ''}`} />
                            <span className="text-sm font-medium text-stone-700">{order.status}</span>
                          </div>
                        </div>
                        <div className="col-span-3">
                          <div className="flex items-center gap-2 text-stone-500">
                            <Calendar className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
                            <span className="text-sm font-medium">{order.date}</span>
                          </div>
                        </div>
                        <div className="col-span-2">
                          <div className="flex items-baseline gap-0.5">
                            <span className="text-[11px] font-medium text-stone-400">₹</span>
                            <span className="text-[18px] font-bold text-stone-900 tracking-tight leading-none">
                              {order.value}
                            </span>
                          </div>
                        </div>
                        <div className="col-span-1 flex justify-end">
                          <div className="w-9 h-9 rounded-xl bg-white border border-stone-200 flex items-center justify-center shadow-sm transition-all duration-200 group-hover:bg-red-800 group-hover:border-red-800">
                            <ChevronRight className="w-4 h-4 text-stone-400 transition-all duration-200 group-hover:text-white group-hover:translate-x-0.5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-10 flex items-center justify-center gap-2.5">
              <span className="text-[12px] text-stone-400">
                {orders.length} {orders.length === 1 ? 'order' : 'orders'} total
              </span>
              <span className="text-stone-200 select-none">·</span>
              <button onClick={fetchOrderHistoryData}
                className="text-[12px] text-red-800 font-semibold hover:text-red-700 inline-flex items-center gap-1.5 transition-colors duration-150">
                <RefreshCw className="w-3 h-3" /> Refresh
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};