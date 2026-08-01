import DesignBanner from '@/components/DesignBanner'

export default function AtomPage() {
  return (
    <>
      <DesignBanner current="Atom" />
      <iframe
        src="/designs/atom.html"
        className="fixed inset-0 w-full h-full border-0"
        style={{ top: 36 }}
        title="Atom design option"
      />
    </>
  )
}
