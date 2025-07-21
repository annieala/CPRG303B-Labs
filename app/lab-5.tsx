import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  RefreshControl,
  StyleSheet,
  TextInput,
  Modal,
} from 'react-native';
import { getAll, create, updateById, deleteById } from '../lib/supabase_crud';

// Simple user type - adjust fields to match your sampledatabase table
interface User {
  id: string;
  name?: string;
  email?: string;
  [key: string]: any;
}

const UserDataDisplay = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '' });

  // Function to fetch users
  const fetchUsers = async (isRefresh = false) => {
    if (!isRefresh) setLoading(true);
    setError(null);
    
    try {
      console.log('Attempting to fetch users from sampledatabase...');
      const result = await getAll<User>('sampledatabase');
      console.log('Supabase result:', result);
      
      if (result.success && result.data) {
        setUsers(result.data);
        console.log('Users loaded:', result.data);
      } else {
        const errorMsg = `Failed to fetch users: ${result.error}`;
        setError(errorMsg);
        console.error('Supabase error:', result.error);
        if (isRefresh) Alert.alert('Error', errorMsg);
      }
    } catch (err) {
      const errorMsg = `Error fetching data: ${err instanceof Error ? err.message : 'Unknown error'}`;
      console.error('Error details:', err);
      setError(errorMsg);
      if (isRefresh) Alert.alert('Error', errorMsg);
    } finally {
      setLoading(false);
      if (isRefresh) setRefreshing(false);
    }
  };

  // CREATE - Add new user
  const handleAddUser = async () => {
    if (!formData.name.trim() || !formData.email.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      const result = await create('sampledatabase', formData);
      
      if (result.success) {
        Alert.alert('Success', 'User added successfully!');
        setFormData({ name: '', email: '' });
        setShowAddModal(false);
        fetchUsers();
      } else {
        Alert.alert('Error', `Failed to add user: ${result.error}`);
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to add user');
      console.error('Add error:', err);
    }
  };

  // UPDATE - Edit existing user
  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setFormData({ name: user.name || '', email: user.email || '' });
    setShowEditModal(true);
  };

  const handleUpdateUser = async () => {
    if (!editingUser || !formData.name.trim() || !formData.email.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      const result = await updateById('sampledatabase', editingUser.id, formData);
      
      if (result.success) {
        Alert.alert('Success', 'User updated successfully!');
        setFormData({ name: '', email: '' });
        setShowEditModal(false);
        setEditingUser(null);
        fetchUsers();
      } else {
        Alert.alert('Error', `Failed to update user: ${result.error}`);
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to update user');
      console.error('Update error:', err);
    }
  };

  // DELETE - Remove user
  const handleDeleteUser = async (user: User) => {
    Alert.alert(
      'Delete User',
      `Are you sure you want to delete ${user.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const result = await deleteById('sampledatabase', user.id);
              
              if (result.success) {
                Alert.alert('Success', 'User deleted successfully!');
                fetchUsers();
              } else {
                Alert.alert('Error', `Failed to delete user: ${result.error}`);
              }
            } catch (err) {
              Alert.alert('Error', 'Failed to delete user');
              console.error('Delete error:', err);
            }
          }
        }
      ]
    );
  };

  // Pull to refresh handler
  const onRefresh = () => {
    setRefreshing(true);
    fetchUsers(true);
  };

  // Show user details
  const showUserDetails = (user: User) => {
    Alert.alert(
      'User Details',
      `ID: ${user.id}\nName: ${user.name || 'N/A'}\nEmail: ${user.email || 'N/A'}`,
      [
        { text: 'Edit', onPress: () => handleEditUser(user) },
        { text: 'Delete', style: 'destructive', onPress: () => handleDeleteUser(user) },
        { text: 'Close' }
      ]
    );
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={styles.loadingText}>Loading Sample Database Users...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Sample Database Users</Text>
        
        {/* CRUD Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.button, styles.createButton]} 
            onPress={() => setShowAddModal(true)}
          >
            <Text style={styles.buttonText}>➕ Add User</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.refreshButton]} 
            onPress={() => fetchUsers()}
          >
            <Text style={styles.buttonText}>🔄 Refresh</Text>
          </TouchableOpacity>
        </View>
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Error:</Text>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {users.length === 0 && !error ? (
        <View style={styles.warningContainer}>
          <Text style={styles.warningText}>No users found. Tap "Add User" to create one!</Text>
        </View>
      ) : (
        <View style={styles.usersContainer}>
          {users.map((user) => (
            <View key={user.id} style={styles.userCard}>
              <TouchableOpacity onPress={() => showUserDetails(user)}>
                <Text style={styles.userIdText}>ID: {user.id}</Text>
                {user.name && <Text style={styles.userInfoText}>Name: {user.name}</Text>}
                {user.email && <Text style={styles.userInfoText}>Email: {user.email}</Text>}
                <Text style={styles.tapText}>Tap for options</Text>
              </TouchableOpacity>
              
              {/* Quick Action Buttons */}
              <View style={styles.quickActions}>
                <TouchableOpacity 
                  style={[styles.quickButton, styles.editButton]} 
                  onPress={() => handleEditUser(user)}
                >
                  <Text style={styles.quickButtonText}>✏️ Edit</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.quickButton, styles.deleteButton]} 
                  onPress={() => handleDeleteUser(user)}
                >
                  <Text style={styles.quickButtonText}>🗑️ Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* ADD USER MODAL */}
      <Modal visible={showAddModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add New User</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              keyboardType="email-address"
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]} 
                onPress={() => {
                  setShowAddModal(false);
                  setFormData({ name: '', email: '' });
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.saveButton]} 
                onPress={handleAddUser}
              >
                <Text style={styles.saveButtonText}>Add User</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* EDIT USER MODAL */}
      <Modal visible={showEditModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Edit User</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              keyboardType="email-address"
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]} 
                onPress={() => {
                  setShowEditModal(false);
                  setEditingUser(null);
                  setFormData({ name: '', email: '' });
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.saveButton]} 
                onPress={handleUpdateUser}
              >
                <Text style={styles.saveButtonText}>Update User</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.debugContainer}>
        <Text style={styles.debugTitle}>Debug Info:</Text>
        <Text style={styles.debugText}>Total users: {users.length}</Text>
        <Text style={styles.debugText}>CRUD operations enabled</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6B7280',
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
  },
  createButton: {
    backgroundColor: '#10B981',
  },
  refreshButton: {
    backgroundColor: '#3B82F6',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },
  errorContainer: {
    backgroundColor: '#FEE2E2',
    borderColor: '#F87171',
    borderWidth: 1,
    padding: 16,
    margin: 20,
    borderRadius: 8,
  },
  errorTitle: {
    fontWeight: 'bold',
    color: '#B91C1C',
    marginBottom: 4,
  },
  errorText: {
    color: '#B91C1C',
  },
  warningContainer: {
    backgroundColor: '#FEF3C7',
    borderColor: '#F59E0B',
    borderWidth: 1,
    padding: 16,
    margin: 20,
    borderRadius: 8,
  },
  warningText: {
    color: '#92400E',
    textAlign: 'center',
  },
  usersContainer: {
    padding: 20,
  },
  userCard: {
    backgroundColor: 'white',
    borderColor: '#E5E7EB',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  userIdText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  userInfoText: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 2,
  },
  tapText: {
    fontSize: 12,
    color: '#3B82F6',
    marginTop: 8,
  },
  quickActions: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 8,
  },
  quickButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    flex: 1,
  },
  editButton: {
    backgroundColor: '#F59E0B',
  },
  deleteButton: {
    backgroundColor: '#EF4444',
  },
  quickButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
  },
  cancelButton: {
    backgroundColor: '#6B7280',
  },
  saveButton: {
    backgroundColor: '#10B981',
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },
  debugContainer: {
    padding: 20,
    backgroundColor: '#F3F4F6',
    margin: 20,
    borderRadius: 8,
  },
  debugTitle: {
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 8,
  },
  debugText: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
});

export default UserDataDisplay;