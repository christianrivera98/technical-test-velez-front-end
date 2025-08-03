// components/navbar/BackgroundOrbs.tsx
export default function BackgroundOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[2rem]">
      <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-olive-green/20 to-golden/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-burnt-orange/20 to-dark-green/20 rounded-full blur-xl animate-pulse delay-1000"></div>
    </div>
  )
}