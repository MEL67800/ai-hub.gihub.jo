import Link from "next/link";
import { getAllNews } from "@/lib/db";
import { Button } from "@/components/ui/Button";
import { DeleteButton } from "../components/DeleteButton";

export default function AdminNewsPage() {
  const newsList = getAllNews();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">资讯管理</h1>
        <Link href="/admin/news/new">
          <Button>新增资讯</Button>
        </Link>
      </div>
      <div className="rounded-2xl border border-neutral-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-neutral-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-neutral-500">标题</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-neutral-500">关联产品 ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-neutral-500">发布时间</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-neutral-500">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {newsList.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 text-sm font-medium">{item.title}</td>
                <td className="px-6 py-4 text-sm text-neutral-500">
                  {item.product_id ?? "-"}
                </td>
                <td className="px-6 py-4 text-sm text-neutral-500">
                  {item.published_at?.slice(0, 10)}
                </td>
                <td className="px-6 py-4 text-sm space-x-3">
                  <Link
                    href={`/admin/news/${item.id}/edit`}
                    className="text-blue-600 hover:underline"
                  >
                    编辑
                  </Link>
                  <DeleteButton apiPath={`/api/news/${item.id}`} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
