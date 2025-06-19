
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, Package, Edit, Trash2 } from 'lucide-react';
import { StockGroup } from '@/types';
import { useToast } from '@/hooks/use-toast';

export const StockManager = () => {
  const [groups, setGroups] = useState<StockGroup[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingGroup, setEditingGroup] = useState<StockGroup | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    quantity: 0,
    mlIds: '',
  });

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await fetch('/api/stock/groups');
      const data = await response.json();
      setGroups(data);
    } catch (error) {
      console.error('Error fetching stock groups:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const method = editingGroup ? 'PUT' : 'POST';
      const url = editingGroup ? `/api/stock/groups/${editingGroup.id}` : '/api/stock/groups';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          mlIds: formData.mlIds.split(',').map(id => id.trim()),
        }),
      });

      if (response.ok) {
        fetchGroups();
        setShowForm(false);
        setEditingGroup(null);
        setFormData({ name: '', quantity: 0, mlIds: '' });
        toast({
          title: editingGroup ? "Grupo atualizado" : "Grupo criado",
          description: "Grupo de estoque salvo com sucesso!",
        });
      }
    } catch (error) {
      console.error('Error saving stock group:', error);
      toast({
        title: "Erro",
        description: "Erro ao salvar grupo. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (group: StockGroup) => {
    setEditingGroup(group);
    setFormData({
      name: group.name,
      quantity: group.quantity,
      mlIds: group.mlIds.join(', '),
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/stock/groups/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchGroups();
        toast({
          title: "Grupo excluído",
          description: "Grupo de estoque excluído com sucesso!",
        });
      }
    } catch (error) {
      console.error('Error deleting stock group:', error);
      toast({
        title: "Erro",
        description: "Erro ao excluir grupo. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Estoque Sincronizado</h2>
          <p className="text-gray-400">Gerencie grupos de produtos com estoque compartilhado</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Grupo
        </Button>
      </div>

      {showForm && (
        <Card className="bg-[#1a1a1a] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">
              {editingGroup ? 'Editar Grupo' : 'Novo Grupo de Estoque'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label className="text-gray-300">Nome do Grupo</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Ex: Smartphone Galaxy S23"
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>

              <div>
                <Label className="text-gray-300">Quantidade em Estoque</Label>
                <Input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value)})}
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>

              <div>
                <Label className="text-gray-300">IDs dos Anúncios ML (separados por vírgula)</Label>
                <Input
                  value={formData.mlIds}
                  onChange={(e) => setFormData({...formData, mlIds: e.target.value})}
                  placeholder="MLB123456789, MLB987654321"
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>

              <div className="flex space-x-2">
                <Button type="submit" disabled={loading}>
                  {loading ? 'Salvando...' : 'Salvar'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setShowForm(false);
                    setEditingGroup(null);
                    setFormData({ name: '', quantity: 0, mlIds: '' });
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <Card key={group.id} className="bg-[#1a1a1a] border-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  {group.name}
                </CardTitle>
                <div className="flex space-x-1">
                  <Button size="sm" variant="ghost" onClick={() => handleEdit(group)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleDelete(group.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Estoque:</span>
                  <Badge variant={group.quantity > 0 ? "default" : "destructive"}>
                    {group.quantity} unidades
                  </Badge>
                </div>
                
                <div>
                  <span className="text-gray-400 text-sm">Anúncios sincronizados:</span>
                  <div className="mt-1 space-y-1">
                    {group.mlIds.map((mlId) => (
                      <Badge key={mlId} variant="outline" className="mr-1 text-xs">
                        {mlId}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {groups.length === 0 && (
        <Card className="bg-[#1a1a1a] border-gray-800">
          <CardContent className="p-8 text-center">
            <Package className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400">Nenhum grupo de estoque criado ainda</p>
            <Button onClick={() => setShowForm(true)} className="mt-4">
              Criar Primeiro Grupo
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
