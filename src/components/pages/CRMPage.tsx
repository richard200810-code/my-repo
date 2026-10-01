import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertCircle, Users, Calendar, FileText } from 'lucide-react';

export default function CRMPage() {
  const [activeTab, setActiveTab] = useState<'list' | 'detail' | 'tasks'>('list');
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);

  const securityMessage = '⚠️ 系统安全提示：客户数据操作已禁用。需要管理员身份验证才能访问此功能。请联系系统管理员配置身份验证。';

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 w-full max-w-[100rem] mx-auto px-4 py-8">
        {/* Security Alert */}
        <div className="mb-8 p-4 bg-destructive/10 border border-destructive rounded-lg flex gap-3">
          <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-destructive">{securityMessage}</p>
          </div>
        </div>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-heading font-bold text-primary mb-2">客户关系管理</h1>
          <p className="text-lg font-paragraph text-secondary/70">CRM 系统 - 预览模式（功能已禁用）</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 border-b border-secondary/20">
          <button
            onClick={() => setActiveTab('list')}
            className={`px-4 py-3 font-paragraph font-medium transition-colors ${
              activeTab === 'list'
                ? 'text-primary border-b-2 border-primary'
                : 'text-secondary/60 hover:text-secondary'
            }`}
          >
            <Users className="w-4 h-4 inline mr-2" />
            客户列表
          </button>
          <button
            onClick={() => setActiveTab('detail')}
            className={`px-4 py-3 font-paragraph font-medium transition-colors ${
              activeTab === 'detail'
                ? 'text-primary border-b-2 border-primary'
                : 'text-secondary/60 hover:text-secondary'
            }`}
          >
            <FileText className="w-4 h-4 inline mr-2" />
            客户详情
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={`px-4 py-3 font-paragraph font-medium transition-colors ${
              activeTab === 'tasks'
                ? 'text-primary border-b-2 border-primary'
                : 'text-secondary/60 hover:text-secondary'
            }`}
          >
            <Calendar className="w-4 h-4 inline mr-2" />
            今日任务
          </button>
        </div>

        {/* Content Area */}
        <div className="space-y-6">
          {/* Customer List Tab */}
          {activeTab === 'list' && (
            <div className="space-y-4">
              <div className="flex gap-4 mb-6">
                <Input
                  placeholder="搜索客户名称、公司或邮箱..."
                  disabled
                  className="flex-1 opacity-50 cursor-not-allowed"
                />
                <Button disabled className="opacity-50 cursor-not-allowed">
                  搜索
                </Button>
              </div>

              <div className="grid gap-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="p-6 hover:shadow-md transition-shadow opacity-60">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-heading font-bold text-lg text-primary mb-2">
                          示例客户 {i}
                        </h3>
                        <div className="grid grid-cols-2 gap-4 text-sm font-paragraph text-secondary/70">
                          <div>
                            <span className="font-medium">公司：</span>
                            <span>示例公司 {i}</span>
                          </div>
                          <div>
                            <span className="font-medium">联系人：</span>
                            <span>张三</span>
                          </div>
                          <div>
                            <span className="font-medium">邮箱：</span>
                            <span>customer{i}@example.com</span>
                          </div>
                          <div>
                            <span className="font-medium">电话：</span>
                            <span>+86 138 0000 000{i}</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        disabled
                        onClick={() => setSelectedCustomerId(`customer-${i}`)}
                        className="opacity-50 cursor-not-allowed"
                      >
                        查看详情
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="text-center py-8 text-secondary/50 font-paragraph">
                <p>数据加载已禁用 - 需要管理员身份验证</p>
              </div>
            </div>
          )}

          {/* Customer Detail Tab */}
          {activeTab === 'detail' && (
            <div className="space-y-6">
              <Card className="p-8 opacity-60">
                <h2 className="text-2xl font-heading font-bold text-primary mb-6">客户详情表单</h2>
                
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-paragraph font-medium text-secondary mb-2">
                      公司名称
                    </label>
                    <Input disabled placeholder="示例公司" />
                  </div>
                  <div>
                    <label className="block text-sm font-paragraph font-medium text-secondary mb-2">
                      联系人
                    </label>
                    <Input disabled placeholder="张三" />
                  </div>
                  <div>
                    <label className="block text-sm font-paragraph font-medium text-secondary mb-2">
                      邮箱地址
                    </label>
                    <Input disabled placeholder="customer@example.com" type="email" />
                  </div>
                  <div>
                    <label className="block text-sm font-paragraph font-medium text-secondary mb-2">
                      电话号码
                    </label>
                    <Input disabled placeholder="+86 138 0000 0000" />
                  </div>
                  <div>
                    <label className="block text-sm font-paragraph font-medium text-secondary mb-2">
                      WhatsApp
                    </label>
                    <Input disabled placeholder="+86 138 0000 0000" />
                  </div>
                  <div>
                    <label className="block text-sm font-paragraph font-medium text-secondary mb-2">
                      客户来源
                    </label>
                    <Input disabled placeholder="网站/推荐/其他" />
                  </div>
                  <div>
                    <label className="block text-sm font-paragraph font-medium text-secondary mb-2">
                      客户类型
                    </label>
                    <Input disabled placeholder="零售/批发/代理" />
                  </div>
                  <div>
                    <label className="block text-sm font-paragraph font-medium text-secondary mb-2">
                      销售阶段
                    </label>
                    <Input disabled placeholder="潜在/洽谈/成交" />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-paragraph font-medium text-secondary mb-2">
                    备注
                  </label>
                  <textarea
                    disabled
                    placeholder="输入客户备注信息..."
                    className="w-full p-3 border border-secondary/20 rounded-lg opacity-50 cursor-not-allowed font-paragraph"
                    rows={4}
                  />
                </div>

                <div className="flex gap-4">
                  <Button disabled className="opacity-50 cursor-not-allowed">
                    保存更改
                  </Button>
                  <Button disabled variant="outline" className="opacity-50 cursor-not-allowed">
                    取消
                  </Button>
                </div>
              </Card>

              <div className="text-center py-8 text-secondary/50 font-paragraph">
                <p>表单已禁用 - 需要管理员身份验证</p>
              </div>
            </div>
          )}

          {/* Today's Tasks Tab */}
          {activeTab === 'tasks' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-heading font-bold text-primary">今日任务</h2>
                <Button disabled className="opacity-50 cursor-not-allowed">
                  + 新建任务
                </Button>
              </div>

              <div className="grid gap-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="p-6 opacity-60">
                    <div className="flex items-start gap-4">
                      <input
                        type="checkbox"
                        disabled
                        className="mt-1 opacity-50 cursor-not-allowed"
                      />
                      <div className="flex-1">
                        <h3 className="font-heading font-bold text-lg text-primary mb-2">
                          示例任务 {i}
                        </h3>
                        <p className="text-sm font-paragraph text-secondary/70 mb-3">
                          与示例客户 {i} 进行跟进沟通
                        </p>
                        <div className="flex gap-4 text-xs font-paragraph text-secondary/60">
                          <span>📅 2026-10-0{i}</span>
                          <span>👤 示例客户 {i}</span>
                          <span>🏷️ 跟进</span>
                        </div>
                      </div>
                      <Button disabled variant="outline" size="sm" className="opacity-50 cursor-not-allowed">
                        编辑
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="text-center py-8 text-secondary/50 font-paragraph">
                <p>任务列表已禁用 - 需要管理员身份验证</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-12 p-6 bg-secondary/5 rounded-lg border border-secondary/10">
          <h3 className="font-heading font-bold text-primary mb-3">系统状态</h3>
          <ul className="space-y-2 text-sm font-paragraph text-secondary/70">
            <li>✓ 集合 ID: <code className="bg-secondary/10 px-2 py-1 rounded">customers</code></li>
            <li>✓ 集合 ID: <code className="bg-secondary/10 px-2 py-1 rounded">followups</code></li>
            <li>⚠️ 权限状态: 待配置（需要管理员身份验证）</li>
            <li>⚠️ 所有数据操作: 已禁用（预览模式）</li>
            <li>📍 路由: <code className="bg-secondary/10 px-2 py-1 rounded">/crm</code></li>
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  );
}
