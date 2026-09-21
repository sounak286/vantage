'use client'

import { useMemo, useState } from 'react'
import {
  Bell,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Download,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  UserRound,
  UsersRound,
  X,
} from 'lucide-react'

const initialRequests = [
  { id: 'VP-1048', visitor: 'Rohan Mehta', initials: 'RM', purpose: 'Family visit', resident: 'You', apartment: 'A-204', date: 'Today, 06:30 PM', status: 'Approved', phone: '+91 98765 43210' },
  { id: 'VP-1047', visitor: 'Aditi Sharma', initials: 'AS', purpose: 'Delivery', resident: 'You', apartment: 'A-204', date: 'Today, 02:15 PM', status: 'Checked-In', phone: '+91 98201 44218' },
  { id: 'VP-1046', visitor: 'Karan Patel', initials: 'KP', purpose: 'Maintenance', resident: 'Ananya Rao', apartment: 'B-110', date: 'Yesterday, 11:00 AM', status: 'Checked-Out', phone: '+91 99876 12345' },
  { id: 'VP-1045', visitor: 'Sneha Iyer', initials: 'SI', purpose: 'Family visit', resident: 'Vikram Singh', apartment: 'C-302', date: 'Yesterday, 08:00 PM', status: 'Pending', phone: '+91 98123 76451' },
  { id: 'VP-1044', visitor: 'Arjun Nair', initials: 'AN', purpose: 'Cab / Ride', resident: 'You', apartment: 'A-204', date: '22 Sep, 09:00 AM', status: 'Rejected', phone: '+91 98900 21983' },
]

const statusStyles: Record<string, string> = {
  Approved: 'status-approved',
  'Checked-In': 'status-active',
  'Checked-Out': 'status-complete',
  Pending: 'status-pending',
  Rejected: 'status-rejected',
}

function StatusPill({ status }: { status: string }) {
  return <span className={`status-pill ${statusStyles[status]}`}><span className="status-dot" />{status}</span>
}

function StatCard({ label, value, caption, tone, icon: Icon }: { label: string; value: string; caption: string; tone: string; icon: typeof UsersRound }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${tone}`}><Icon size={19} /></div>
      <div className="stat-copy"><p>{label}</p><strong>{value}</strong><span>{caption}</span></div>
      <MoreHorizontal size={17} className="stat-more" />
    </div>
  )
}

export default function VisitorDashboard() {
  const [requests, setRequests] = useState(initialRequests)
  const [activeNav, setActiveNav] = useState('Overview')
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All requests')
  const [showForm, setShowForm] = useState(false)
  const [toast, setToast] = useState('')

  const filtered = useMemo(() => requests.filter((request) => {
    const matchesQuery = `${request.visitor} ${request.resident} ${request.id}`.toLowerCase().includes(query.toLowerCase())
    const matchesFilter = filter === 'All requests' || request.status === filter
    return matchesQuery && matchesFilter
  }), [requests, query, filter])

  function submitRequest(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const visitor = String(form.get('visitor') || 'New visitor')
    setRequests([{ id: `VP-${1050 + requests.length}`, visitor, initials: visitor.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase(), purpose: String(form.get('purpose') || 'Personal visit'), resident: 'You', apartment: 'A-204', date: 'Tomorrow, 10:00 AM', status: 'Pending', phone: String(form.get('phone') || '') }, ...requests])
    setShowForm(false)
    setToast('Visitor pass request submitted successfully')
    setTimeout(() => setToast(''), 3500)
  }

  function approve(id: string) {
    setRequests((current) => current.map((request) => request.id === id ? { ...request, status: 'Approved' } : request))
    setToast('Request approved')
    setTimeout(() => setToast(''), 2500)
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><div className="brand-mark"><Building2 size={19} /></div><span>Gatekeeper</span></div>
        <div className="workspace-switch"><div className="workspace-avatar">S</div><div><b>Sunrise Apartments</b><span>Admin workspace</span></div><ChevronDown size={15} /></div>
        <nav className="main-nav" aria-label="Main navigation">
          <p className="nav-label">Workspace</p>
          {[['Overview', LayoutDashboard], ['Visitor requests', FileText], ['Residents', UsersRound], ['Activity log', Clock3]].map(([label, Icon]) => <button key={label as string} className={`nav-item ${activeNav === label ? 'active' : ''}`} onClick={() => setActiveNav(label as string)}><Icon size={18} />{label as string}{label === 'Visitor requests' && <span className="nav-count">12</span>}</button>)}
          <p className="nav-label nav-label-spaced">Manage</p>
          {[['Notifications', Bell], ['Settings', Settings]].map(([label, Icon]) => <button key={label as string} className={`nav-item ${activeNav === label ? 'active' : ''}`} onClick={() => setActiveNav(label as string)}><Icon size={18} />{label as string}</button>)}
        </nav>
        <div className="sidebar-bottom"><div className="help-card"><ShieldCheck size={17} /><div><b>Security first</b><span>Your gate is protected</span></div></div><div className="profile-row"><div className="profile-avatar">AM</div><div><b>Arjun Menon</b><span>Administrator</span></div><MoreHorizontal size={17} /></div></div>
      </aside>

      <main className="main-content">
        <header className="topbar"><button className="mobile-menu" aria-label="Open menu"><Menu size={20} /></button><div className="breadcrumbs"><span>Workspace</span><span>/</span><b>{activeNav}</b></div><div className="top-actions"><button className="icon-button" aria-label="Notifications"><Bell size={19} /><i /></button><div className="top-avatar">AM</div></div></header>
        <div className="content-wrap">
          <section className="page-intro"><div><p className="eyebrow">Tuesday, September 23, 2025</p><h1>Good morning, Arjun<span>.</span></h1><p className="intro-copy">Here&apos;s what&apos;s happening at Sunrise Apartments today.</p></div><button className="primary-button" onClick={() => setShowForm(true)}><Plus size={18} />New visitor pass</button></section>
          <section className="stats-grid"><StatCard label="Total requests" value="128" caption="↑ 12% from last month" tone="purple" icon={FileText} /><StatCard label="Pending approval" value="12" caption="Requires your attention" tone="amber" icon={Clock3} /><StatCard label="Checked-in now" value="08" caption="Currently on premises" tone="green" icon={UsersRound} /><StatCard label="Overdue visits" value="03" caption="Needs follow-up" tone="red" icon={Bell} /></section>
          <section className="quick-grid"><div className="quick-card"><div className="quick-icon purple-bg"><Plus size={20} /></div><div><b>Create visitor pass</b><span>Pre-authorize an expected guest</span></div><button onClick={() => setShowForm(true)} aria-label="Create visitor pass"><span>→</span></button></div><div className="quick-card"><div className="quick-icon blue-bg"><Download size={20} /></div><div><b>Export request log</b><span>Download a CSV of all visits</span></div><button onClick={() => setToast('Request log exported')} aria-label="Export request log"><span>↓</span></button></div><div className="quick-card"><div className="quick-icon green-bg"><ShieldCheck size={20} /></div><div><b>View overdue visits</b><span>3 visits need your attention</span></div><button onClick={() => setFilter('Checked-In')} aria-label="View overdue visits"><span>→</span></button></div></section>
          <section className="requests-section"><div className="section-heading"><div><h2>Recent visitor requests</h2><p>Review and manage visitor access across the property.</p></div><button className="text-button">View all requests <span>→</span></button></div><div className="toolbar"><div className="search-field"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search visitor or resident..." aria-label="Search visitor or resident" /></div><button className="filter-button" onClick={() => setFilter(filter === 'All requests' ? 'Pending' : 'All requests')}><SlidersHorizontal size={16} />{filter}<ChevronDown size={15} /></button></div><div className="table-wrap"><table><thead><tr><th>VISITOR</th><th>RESIDENT / UNIT</th><th>VISIT WINDOW</th><th>STATUS</th><th><span className="sr-only">Actions</span></th></tr></thead><tbody>{filtered.map((request) => <tr key={request.id}><td><div className="visitor-cell"><div className="visitor-avatar">{request.initials}</div><div><b>{request.visitor}</b><span>{request.id} · {request.purpose}</span></div></div></td><td><b>{request.resident}</b><span className="table-muted">Unit {request.apartment}</span></td><td><b>{request.date}</b><span className="table-muted">Expected visit</span></td><td><StatusPill status={request.status} /></td><td><button className="row-menu" onClick={() => request.status === 'Pending' && approve(request.id)} aria-label={`Manage ${request.visitor}`}><MoreHorizontal size={18} /></button></td></tr>)}</tbody></table>{filtered.length === 0 && <div className="empty-state">No visitor requests match your search.</div>}</div><div className="table-footer"><span>Showing {filtered.length} of 128 requests</span><div className="pagination"><button disabled>←</button><button className="selected-page">1</button><button>2</button><button>3</button><span>...</span><button>13</button><button>→</button></div></div></section>
        </div>
      </main>

      {showForm && <div className="modal-backdrop" onClick={() => setShowForm(false)}><div className="modal" onClick={(event) => event.stopPropagation()}><div className="modal-header"><div><p className="eyebrow">New request</p><h2>Create visitor pass</h2></div><button className="close-button" onClick={() => setShowForm(false)} aria-label="Close"><X size={19} /></button></div><form onSubmit={submitRequest}><label>Visitor name<input name="visitor" required placeholder="e.g. Rohan Mehta" /></label><label>Phone number<input name="phone" required placeholder="10-digit mobile number" pattern="[0-9 +()-]{10,}" /></label><label>Purpose<select name="purpose" defaultValue="Family visit"><option>Family visit</option><option>Delivery</option><option>Maintenance</option><option>Cab / Ride</option><option>Other</option></select></label><div className="form-row"><label>Arrival date<input type="date" required /></label><label>Expected departure<input type="time" required /></label></div><div className="modal-actions"><button type="button" className="secondary-button" onClick={() => setShowForm(false)}>Cancel</button><button className="primary-button" type="submit"><Check size={17} />Submit request</button></div></form></div></div>}
      {toast && <div className="toast"><Check size={16} />{toast}</div>}
    </div>
  )
}

export { UserRound, LogOut }
