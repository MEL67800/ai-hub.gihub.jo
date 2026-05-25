import Link from "next/link";
import { getAllProducts } from "@/lib/db";
import { Button } from "@/components/ui/Button";
import { DeleteButton } from "../components/DeleteButton";

export default function AdminProductsPage() {
  const products = getAllProducts();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">产品管理</h1>
        <Link href="/admin/products/new">
          <Button>新增产品</Button>
        </Link>
      </div>
      <div className="rounded-2xl border border-neutral-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-neutral-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-neutral-500">名称</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-neutral-500">公司</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-neutral-500">状态</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-neutral-500">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {products.map((p) => (
              <tr key={p.id}>
                <td className="px-6 py-4 text-sm font-medium">{p.name}</td>
                <td className="px-6 py-4 text-sm text-neutral-500">{p.company}</td>
                <td className="px-6 py-4 text-sm">{p.status}</td>
                <td className="px-6 py-4 text-sm space-x-3">
                  <Link href={`/admin/products/${p.slug}/edit`} className="text-blue-600 hover:underline">编辑</Link>
                  <DeleteButton apiPath={`/api/products/${p.slug}`} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
